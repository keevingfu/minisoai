import { useState, useEffect } from 'react';
import { createDeepModel, DEFAULT_THOUGHT_STEPS } from './deepmodel';
import {
  updateStepProgress as updateProgress,
  extractCompetitors,
  extractIndustry,
  extractTargetAudience,
  extractProduct,
  processResearchResult
} from './index.js';
import ReactMarkdown from 'react-markdown';
import OverviewTab from './OverviewTab';
import MinisoDataIntegrationTab from './MinisoDataIntegrationTab';
import RecommendationsTab from './RecommendationsTab';
import {
  Search,
  Brain,
  Database,
  Zap,
  Filter,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  Check,
  X,
  MessageCircle,
  Tag,
  Clipboard
} from 'lucide-react';
import './deepresearchstyles.css';

const DeepResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [deepModel, setDeepModel] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [streamingThoughtChain, setStreamingThoughtChain] = useState([]);
  const [streamingResult, setStreamingResult] = useState('');
  const [currentThoughtStep, setCurrentThoughtStep] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 当前执行的步骤（1-4）
  const [stepProgress, setStepProgress] = useState(0); // 当前步骤的进度（0-100）
  const researchTopics = [
    'Consumer trends in eco-friendly stationery',
    'Gen Z campus life product preferences',
    'Holiday gift market forecast 2025',
    'Stationary market competitive analysis'
  ];
  
  
    // Initialize DeepModel instance
  useEffect(() => {
    // Get API key from environment variables
    // Note: In production, you should use environment variables instead of hardcoded API keys
    // Here we temporarily use a hardcoded key for demonstration and debugging purposes
    console.log('Initializing DeepModel...');
    
    // 尝试从环境变量获取API密钥
    let apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
        
    // 再次检查API密钥是否存在
    if (!apiKey) {
      console.error('API key not found');
      setApiError('API key not found, please check environment variable configuration');
      return;
    }
    
    try {
      const model = createDeepModel(apiKey);
      setDeepModel(model);
    } catch (error) {
      console.error('Error initializing DeepModel:', error);
      setApiError(`Unable to initialize AI model, please check API configuration. Error message: ${error.message}`);
    }
  }, []);
  

  useEffect(() => {
    let progressInterval;
    
    if (analysisInProgress && currentStep > 0) {
      setStepProgress(0);
      
      const totalDuration = 30000; 
      const updateFrequency = 100; 
      const totalSteps = totalDuration / updateFrequency;
      let currentProgressStep = 0;
      
      progressInterval = setInterval(() => {
        currentProgressStep++;
        
        const progress = 100 * (1 - Math.exp(-5 * currentProgressStep / totalSteps));
        
        setStepProgress(prevProgress => {
          const randomFactor = Math.random() * 0.5 + 0.8; 
          const newProgress = Math.max(prevProgress, progress * randomFactor);
          
          return newProgress > 98 ? 98 : newProgress;
        });
        
        if (currentProgressStep > totalSteps * 0.8) {
          clearInterval(progressInterval);
          progressInterval = setInterval(() => {
            setStepProgress(prevProgress => {
              const increment = Math.random() * 0.3;
              const newProgress = prevProgress + increment;
              return newProgress > 98 ? 98 : newProgress;
            });
          }, 500);
        }
      }, updateFrequency);
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [analysisInProgress, currentStep]);

  // 直接在组件内部实现handleSearch函数，避免循环导入
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.log('Search query is empty');
      return;
    }
    if (!deepModel) {
      console.log('Deep model is not initialized');
      return;
    }
    
    setIsSearching(true);
    setApiError(null);
    setStreamingThoughtChain([]);
    setStreamingResult('');
    setCurrentThoughtStep('');
    setIsThinking(true);
    setCurrentStep(0);
    setStepProgress(0);
    
    try {
      setTimeout(() => {
        setIsSearching(false);
        setAnalysisInProgress(true);
      }, 1000);
      
      // 获取当前的stepProgress值
      let stepProgress = 0;
      
      // 创建一个包装函数，用于更新stepProgress值并调用setStepProgress
      const updateStepProgressWrapper = (progress) => {
        stepProgress = progress; // 更新本地变量
        setStepProgress(progress); // 更新React状态
      };
      
      setCurrentStep(1);
      
      let thoughtChainResult;
      try {
        thoughtChainResult = await deepModel.streamThoughtChain(
          searchQuery,
          (step, completedSteps) => {
            setCurrentThoughtStep(step);
            setStreamingThoughtChain(completedSteps);
            const progress = (completedSteps.length / 7) * 100; 
            updateProgress(Math.min(progress, 95), stepProgress, updateStepProgressWrapper);
          },
          (thoughtChain) => {
            setStreamingThoughtChain(thoughtChain);
            setIsThinking(false);
            updateProgress(100, stepProgress, updateStepProgressWrapper); 
          },
          (delta, fullResponse) => {
            setStreamingResult(fullResponse);
          }
        );
        
      } catch (error) {
        console.error('Error in streamThoughtChain:', error);
        thoughtChainResult = {
          thoughtChain: DEFAULT_THOUGHT_STEPS,
          analysisResult: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`
        };
      }
      
      let researchData = processResearchResult(
        "Conducting market research analysis...", 
        searchQuery, 
        thoughtChainResult.thoughtChain,
        thoughtChainResult.analysisResult || '' // Use analysisResult or empty string
      );
      
      setSelectedResearch(researchData);
      
      setCurrentStep(2);
      setStepProgress(0); 
      const marketResearchResult = await deepModel.marketResearch(
        searchQuery,
        null,
        (delta, fullResponse) => {
          const progress = Math.min((fullResponse.length / 2000) * 100, 95);
          updateProgress(progress, stepProgress, updateStepProgressWrapper);
        },
        true 
      );
      updateProgress(100, stepProgress, updateStepProgressWrapper); 
      
      const streamingResultBeforeStep2 = researchData.streamingResult;
      
      researchData = processResearchResult(
        marketResearchResult.result, 
        searchQuery, 
        thoughtChainResult.thoughtChain,
        streamingResultBeforeStep2 
      );
      
      setSelectedResearch({...researchData});
      
      setCurrentStep(3);
      setStepProgress(0); 
      const competitors = extractCompetitors(marketResearchResult.result);
      const competitorAnalysisResult = await deepModel.competitorAnalysis(
        competitors,
        extractIndustry(searchQuery),
        (delta, fullResponse) => {
          const progress = Math.min((fullResponse.length / 1500) * 100, 95);
          updateProgress(progress, stepProgress, updateStepProgressWrapper);
        }
      );
      updateProgress(100, stepProgress, updateStepProgressWrapper); 
      
      const streamingResultBeforeStep3 = researchData.streamingResult;
      
      const updatedResearchData = {
        ...researchData,
        competitorAnalysis: competitorAnalysisResult.result,
        streamingResult: streamingResultBeforeStep3
      };
      
      researchData = updatedResearchData;
      
      setSelectedResearch({...researchData});
      
      setCurrentStep(4);
      setStepProgress(0); 
      const targetAudience = extractTargetAudience(marketResearchResult.result);
      const product = extractProduct(searchQuery);
      const consumerInsightsResult = await deepModel.consumerInsights(
        targetAudience,
        product,
        (delta, fullResponse) => {
          const progress = Math.min((fullResponse.length / 1500) * 100, 95);
          updateProgress(progress, stepProgress, updateStepProgressWrapper);
        }
      );
      updateProgress(100, stepProgress, updateStepProgressWrapper); // Set to 100% to indicate completion
      
      const streamingResultBeforeStep4 = researchData.streamingResult;
      
      const updatedResearchDataStep4 = {
        ...researchData,
        consumerInsights: consumerInsightsResult.result,
        streamingResult: streamingResultBeforeStep4
      };
      
      researchData = updatedResearchDataStep4;
      
      setCurrentStep(0); 
      setAnalysisInProgress(false);
      
      setSelectedResearch({...researchData});
      setActiveTab('overview'); 
      
      return researchData;
    } catch (error) {
      console.error("Search error:", error);
      setIsSearching(false);
      setAnalysisInProgress(false);
      setIsThinking(false);
      setApiError(`Research analysis failed: ${error.message}`);
      return null;
    }
  };
  


  return (
    <div className="module-container">
      <header className="module-header">
        <h1>Deep Research</h1>
        <p className="module-description">Integrated Market Intelligence and Strategic Insights</p>
      </header>
      
      <div className="content-area">
        <div className="search-section">
          <h2 className="section-title">Research Query</h2>
          <div className="search-input-container">
            <div className="search-input-wrapper">
            <input
              type="text"
                placeholder="Enter a detailed market analysis research query..."
                className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
              <div className="search-icon">
                <Brain size={20} />
              </div>
          </div>
          <button 
              className={`search-button ${isSearching || analysisInProgress ? 'disabled' : ''}`}
            onClick={handleSearch}
            disabled={isSearching || analysisInProgress || !searchQuery.trim()}
          >
              {isSearching ? <RefreshCw size={20} className="icon spinning" /> : <Search size={20} className="icon" />}
            {isSearching ? 'Researching...' : 'Research'}
          </button>
        </div>
        
          <div className="suggested-topics">
            <div className="topic-label">Suggested topics:</div>
            {researchTopics.map((topic, index) => (
              <button key={index} className="topic-tag" onClick={() => setSearchQuery(topic)}>
                {topic}
              </button>
            ))}
        </div>
      </div>
      
      {!analysisInProgress && !selectedResearch && (
        <div className="research-results">
          <div className="research-history">
            <div className="history-header">
              <h3>Thought Chain</h3>
              <button className="filter-button">
                <Filter size={18} />
              </button>
            </div>
            <div className="history-list">
              <div className="placeholder-content">
                <p>Your research thought Chain will appear here.</p>
              </div>
            </div>
          </div>
          
          <div className="research-detail">
            <div className="detail-header">
              <div>
                <h2>Deep Research</h2>
                <p>Use the search above to start a new market research analysis.</p>
              </div>
              <div className="progress-indicator">
                <Zap size={28} className="text-pink-600" />
              </div>
            </div>
            
            <div className="analysis-progress-detail">
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-1 mx-auto mt-6">
                <div className="bg-gray-400 h-2.5 rounded-full" style={{width: '0%'}}></div>
              </div>
              <div className="flex w-full max-w-md justify-between text-xs text-gray-500 mx-auto">
                <span>Data Collection</span>
                <span>Integration</span>
                <span>Analysis</span>
                <span>Synthesis</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {analysisInProgress ? (
        <div className="research-results">
          <div className="research-history">
            <div className="history-header">
              <h3>Thought Chain</h3>
              <button className="filter-button">
                <Filter size={18} />
              </button>
            </div>
            <div className="history-list">
              {/* Thought chain process display */}
              {streamingThoughtChain.map((step, index) => (
                <div key={index} className="history-item">
                  <div className="history-item-header">
                    <div className="step-number-circle">{index + 1}</div>
                    <h4>{step}</h4>
                  </div>
                </div>
              ))}
              {isThinking && currentThoughtStep && (
                <div className="history-item active">
                  <div className="history-item-header">
                    <div className="step-number-circle">{streamingThoughtChain.length + 1}</div>
                    <h4>
                      <span className="thinking-indicator">Thinking...</span>
                      {currentThoughtStep}
                    </h4>
                  </div>
                </div>
              )}
              
              {/* Real-time result output */}
              {streamingResult && (
                <div className="history-item result-item">
                  <div className="history-item-header">
                    <div className="step-number-circle">
                      <Zap size={14} />
                    </div>
                    <h4>Analysis Results</h4>
                  </div>
                  <div className="history-item-content">
                    <div className="streaming-result-content">
                      {streamingResult}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="research-detail">
            <div className="detail-header">
              <div>
                <h2>Deep Analysis in Progress</h2>
                <p>analyzing data from multiple sources and integrating insights from MINISO platform modules.</p>
              </div>
              <div className="progress-indicator">
                <Zap size={28} className="text-pink-600 animate-pulse" />
              </div>
            </div>
                        
            {streamingThoughtChain.length >= 2 && (
              <div className="detail-tabs">
                <button
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`tab ${activeTab === 'internal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('internal')}
                >
                  MINISO Data Integration
                </button>
                <button
                  className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recommendations')}
                >
                  Recommendations
                </button>
              </div>
            )}
            
            {activeTab === 'overview' && currentStep > 0 ? (
              <div className="tab-content">
                <div className="summary-section">
                  {/* Step progress indicator */}
                  <div className="step-dots">
                    <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}></div>
                    <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}></div>
                    <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}></div>
                    <div className={`step-dot ${currentStep >= 4 ? 'active' : ''}`}></div>
                  </div>
                  
                  {/* Step status indicator */}
                  <div className="step-status-section">
                    <h3>Research Progress</h3>
                    <div className="step-status-list">
                      <div className={`step-status-item ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'in-progress' : ''}`}>
                        <div className="step-status-icon">
                          {currentStep > 1 ? <Check size={16} /> : currentStep === 1 ? <div className="waiting-animation"></div> : ''}
                        </div>
                        <div className="step-status-text">
                          <span className="step-name">Step 1: Thought Chain Generation</span>
                          <span className="step-status">
                            {currentStep > 1 ? 'Completed' : currentStep === 1 ? 'In progress...' : 'Waiting...'}
                          </span>
                        </div>
                        {currentStep === 1 && (
                          <div className="step-progress">
                            <div className="step-progress-bar">
                              <div className="step-progress-fill active" style={{ width: `${stepProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`step-status-item ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'in-progress' : ''}`}>
                        <div className="step-status-icon">
                          {currentStep > 2 ? <Check size={16} /> : currentStep === 2 ? <div className="waiting-animation"></div> : ''}
                        </div>
                        <div className="step-status-text">
                          <span className="step-name">Step 2: Market Research Analysis</span>
                          <span className="step-status">
                            {currentStep > 2 ? 'Completed' : currentStep === 2 ? 'In progress...' : 'Waiting...'}
                          </span>
                        </div>
                        {currentStep === 2 && (
                          <div className="step-progress">
                            <div className="step-progress-bar">
                              <div className="step-progress-fill active" style={{ width: `${stepProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`step-status-item ${currentStep > 3 ? 'completed' : currentStep === 3 ? 'in-progress' : ''}`}>
                        <div className="step-status-icon">
                          {currentStep > 3 ? <Check size={16} /> : currentStep === 3 ? <div className="waiting-animation"></div> : ''}
                        </div>
                        <div className="step-status-text">
                          <span className="step-name">Step 3: Competitor Analysis</span>
                          <span className="step-status">
                            {currentStep > 3 ? 'Completed' : currentStep === 3 ? 'In progress...' : 'Waiting...'}
                          </span>
                        </div>
                        {currentStep === 3 && (
                          <div className="step-progress">
                            <div className="step-progress-bar">
                              <div className="step-progress-fill active" style={{ width: `${stepProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className={`step-status-item ${currentStep > 4 ? 'completed' : currentStep === 4 ? 'in-progress' : ''}`}>
                        <div className="step-status-icon">
                          {currentStep > 4 ? <Check size={16} /> : currentStep === 4 ? <div className="waiting-animation"></div> : ''}
                        </div>
                        <div className="step-status-text">
                          <span className="step-name">Step 4: Consumer Insights Analysis</span>
                          <span className="step-status">
                            {currentStep > 4 ? 'Completed' : currentStep === 4 ? 'In progress...' : 'Waiting...'}
                          </span>
                        </div>
                        {currentStep === 4 && (
                          <div className="step-progress">
                            <div className="step-progress-bar">
                              <div className="step-progress-fill active" style={{ width: `${stepProgress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'overview' && selectedResearch ? (
              <OverviewTab selectedResearch={selectedResearch} />
            ) : null}
          </div>
        </div>
      ) : selectedResearch && (
          <div className="research-results">
            <div className="research-history">
              <div className="history-header">
                <h3>Thought Chain</h3>
                <button className="filter-button">
                <Filter size={18} />
              </button>
            </div>
              <div className="history-list">
              {selectedResearch.thoughtChain && selectedResearch.thoughtChain.map((step, index) => {
                // Extract step number and content from step text
                return (
                  <div key={index} className={`history-item`}>
                    <div className="history-item-header">
                      <div className="step-number-circle">{index + 1}</div>
                      <h4>{step}</h4>
                    </div>
                  </div>
                );
              })}
              
              {/* Display saved streaming output results */}
              {selectedResearch.streamingResult && (
                <div className="history-item result-item">
                  <div className="history-item-header">
                    <div className="step-number-circle">
                      <Zap size={14} />
                    </div>
                    <h4>Analysis Results</h4>
                  </div>
                  <div className="history-item-content">
                    <div className="streaming-result-content">
                      {selectedResearch.streamingResult}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        
            <div className="research-detail">
              <div className="detail-header">
                  <div>
                  <h2>{selectedResearch.query}</h2>
                  <p>Completed on {selectedResearch.date} • Analyzed {selectedResearch.sources.length} sources</p>
                  </div>
                <div className="detail-actions">
                  <button className="action-button">
                      <Download size={18} />
                    </button>
                  <button className="action-button">
                      <Share2 size={18} />
                    </button>
                </div>
              </div>
              
              <div className="detail-tabs">
                    <button
                  className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                  className={`tab ${activeTab === 'internal' ? 'active' : ''}`}
                      onClick={() => setActiveTab('internal')}
                    >
                      MINISO Data Integration
                    </button>
                    <button
                  className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
                      onClick={() => setActiveTab('recommendations')}
                    >
                      Recommendations
                    </button>
                </div>
                
                {activeTab === 'overview' && selectedResearch && (
                  <OverviewTab selectedResearch={selectedResearch} />
                )}
                
                {activeTab === 'internal' && selectedResearch && (
                  <MinisoDataIntegrationTab selectedResearch={selectedResearch} />
                )}
                
                {activeTab === 'recommendations' && selectedResearch && (
                  <RecommendationsTab selectedResearch={selectedResearch} />
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepResearch;
console.log('Testing handleSearchClick function...');
