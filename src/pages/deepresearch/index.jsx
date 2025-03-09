import { useState } from 'react';
import {
  Search,
  Brain,
  Database,
  Zap,
  Filter,
  Target,
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
import { Link } from 'react-router-dom';
import './deepresearchstyles.css';

const DeepResearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  
  // Mock data for research results
  const researchHistory = [
    { 
      id: 1, 
      query: 'Gen Z shopping behaviors in US market', 
      date: '2025-03-01', 
      sources: 28,
      status: 'completed',
      insights: 15,
      relevance: 92
    },
    { 
      id: 2, 
      query: 'Disney product licensing trends 2025', 
      date: '2025-02-28', 
      sources: 34,
      status: 'completed',
      insights: 22,
      relevance: 95
    },
    { 
      id: 3, 
      query: 'Campus life essentials market analysis', 
      date: '2025-02-25', 
      sources: 31,
      status: 'completed',
      insights: 18,
      relevance: 88
    },
    { 
      id: 4, 
      query: 'Stationary market competitive analysis', 
      date: '2025-02-20', 
      sources: 25,
      status: 'completed',
      insights: 12,
      relevance: 85
    },
  ];
  
  // Mock research detail data
  const mockResearchDetail = {
    id: 2,
    query: "Disney product licensing trends 2025",
    date: "2025-02-28",
    status: "completed",
    summary: 
      "Disney's licensing strategy in 2025 shows significant shifts toward " +
      "digital-physical product integration, sustainability, and immersive " +
      "experiences. Limited-edition collaborations with lifestyle brands " +
      "continue to drive consumer engagement, with particular resonance " +
      "among Gen Z and Millennial demographics. Character preferences show " +
      "strong performance from newer franchises alongside classic characters, " +
      "with regional variations in popularity.",
    sources: [
      { name: "Licensing International", type: "Industry Report", date: "2025-01", reliability: 95 },
      { name: "The Walt Disney Company", type: "Investor Relations", date: "2025-02", reliability: 90 },
      { name: "LIMA Global Licensing Survey", type: "Market Research", date: "2024-12", reliability: 92 },
      { name: "Brand Licensing Europe", type: "Conference Proceedings", date: "2024-11", reliability: 88 }
    ],
    keyFindings: [
      { category: 'Trend', text: 'Increase in digital-physical product integration with AR/VR components' },
      { category: 'Market', text: 'Sustainable and eco-friendly licensed products showing 38% YoY growth' },
      { category: 'Consumer', text: 'Gen Z demonstrates strong preference for limited edition collaborations' },
      { category: 'Strategy', text: 'Character selection becoming more data-driven and regionally customized' },
      { category: 'Competition', text: 'New licensing models emerging with performance-based royalty structures' },
    ],
    internalDataInsights: {
      topPerformingCharacters: [
        { name: 'Mickey & Friends', performance: 100 },
        { name: 'Frozen', performance: 85 },
        { name: 'Marvel Avengers', performance: 82 },
        { name: 'Star Wars', performance: 78 },
        { name: 'Winnie the Pooh', performance: 65 },
      ],
      channelPerformance: [
        { channel: 'TikTok', engagement: 92, conversion: 4.2 },
        { channel: 'Instagram', engagement: 85, conversion: 3.8 },
        { channel: 'Facebook', engagement: 62, conversion: 2.5 },
        { channel: 'Email', engagement: 55, conversion: 5.1 },
      ],
      kocStrategy: [
        { strategy: 'Character unboxing videos', effectiveness: 90, implementation: 75 },
        { strategy: 'Limited edition previews', effectiveness: 95, implementation: 85 },
        { strategy: 'DIY character crafts', effectiveness: 82, implementation: 60 },
        { strategy: 'Collector showcases', effectiveness: 88, implementation: 70 },
      ]
    },
    recommendations: [
      { text: 'Increase TikTok content featuring limited edition Disney collections', priority: 'High', impact: 'High', effort: 'Medium' },
      { text: 'Develop AR experiences to complement physical Disney products', priority: 'Medium', impact: 'High', effort: 'High' },
      { text: 'Create KOC campaign focusing on sustainable Disney product features', priority: 'High', impact: 'Medium', effort: 'Medium' },
      { text: 'Optimize landing pages for top-performing characters by region', priority: 'Medium', impact: 'Medium', effort: 'Low' },
      { text: 'Test performance-based licensing model with select Disney products', priority: 'Low', impact: 'High', effort: 'High' },
    ],
    marketOpportunities: [
      { opportunity: 'Disney character-themed sustainable stationery line', size: 'Large', competition: 'Medium', timeline: 'Q2 2025' },
      { opportunity: 'AR-enhanced Disney storage solutions for students', size: 'Medium', competition: 'Low', timeline: 'Q3 2025' },
      { opportunity: 'Limited edition regional Disney character collections', size: 'Medium', competition: 'Medium', timeline: 'Q4 2025' },
      { opportunity: 'Disney digital collectibles with physical product bundles', size: 'Small', competition: 'Low', timeline: 'Q1 2026' },
    ]
  };
  
  // Handle research search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setAnalysisInProgress(true);
      
      setTimeout(() => {
        setAnalysisInProgress(false);
        setSelectedResearch(mockResearchDetail);
      }, 3000);
    }, 2000);
  };
  
  // Handle selecting a research from history
  const handleSelectResearch = (research) => {
    // In a real app, this would fetch the full research details based on the selected research
    setSelectedResearch({
      ...mockResearchDetail,
      id: research.id,
      query: research.query,
      date: research.date,
      status: research.status
    });
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
              className={`search-button ${isSearching ? 'disabled' : ''}`}
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
          >
              {isSearching ? <RefreshCw size={20} className="icon spinning" /> : <Search size={20} className="icon" />}
            {isSearching ? 'Researching...' : 'Research'}
          </button>
        </div>
        
          <div className="suggested-topics">
            <div className="topic-label">Suggested topics:</div>
            <button className="topic-tag" onClick={() => setSearchQuery('Consumer trends in eco-friendly stationery')}>
            Consumer trends in eco-friendly stationery
          </button>
            <button className="topic-tag" onClick={() => setSearchQuery('Gen Z campus life product preferences')}>
            Gen Z campus life product preferences
          </button>
            <button className="topic-tag" onClick={() => setSearchQuery('Holiday gift market forecast 2025')}>
            Holiday gift market forecast 2025
          </button>
        </div>
      </div>
      
      {analysisInProgress && (
          <div className="analysis-progress">
            <div className="progress-indicator">
              <Zap size={28} className="text-pink-600 animate-pulse" />
            </div>
            <h3>Deep Analysis in Progress</h3>
            <p>Claude 3.7 is analyzing data from multiple sources and integrating insights from MINISO platform modules.</p>
            <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-1 mx-auto mt-6">
              <div className="bg-pink-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
            </div>
            <div className="flex w-full max-w-md justify-between text-xs text-gray-500 mx-auto">
              <span>Data Collection</span>
              <span>Integration</span>
              <span>Analysis</span>
              <span>Synthesis</span>
            </div>
          </div>
        )}
        
        {!analysisInProgress && !selectedResearch && (
          <div className="placeholder-content">
            <h2>Deep Research Module</h2>
            <p>Use the search above to start a new market research, or view historical research records.</p>
        </div>
      )}
      
        {selectedResearch && (
          <div className="research-results">
            <div className="research-history">
              <div className="history-header">
                <h3>Research History</h3>
                <button className="filter-button">
                <Filter size={18} />
              </button>
            </div>
              <div className="history-list">
              {researchHistory.map((research) => (
                <div 
                  key={research.id} 
                    className={`history-item ${selectedResearch && selectedResearch.id === research.id ? 'active' : ''}`}
                    onClick={() => handleSelectResearch(research)}
                  >
                    <div className="history-item-header">
                      <h4>{research.query}</h4>
                      <span className={`status-badge ${research.status}`}>
                        {research.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                    </div>
                    <p className="history-date">{research.date}</p>
                    <div className="history-stats">
                      <div className="stat">
                        <Zap size={14} className="stat-icon insight" />
                        <span>{research.insights} Insights</span>
                      </div>
                      <div className="stat">
                        <Database size={14} className="stat-icon source" />
                        <span>{research.sources} Sources</span>
                      </div>
                      <div className="stat">
                        <Target size={14} className="stat-icon relevance" />
                        <span>{research.relevance}% Relevance</span>
                    </div>
                  </div>
                </div>
              ))}
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
                
                {activeTab === 'overview' && (
                <div className="tab-content">
                  <div className="summary-section">
                    <h3>Executive Summary</h3>
                    <p>{selectedResearch.summary}</p>
                    
                    <div className="insights-grid">
                      <div className="insight-card">
                        <h4>
                          <Zap size={18} className="card-icon" /> 
                            Key Findings
                          </h4>
                        <div className="findings-list">
                            {selectedResearch.keyFindings.map((finding, index) => (
                            <div key={index} className="finding-item">
                              <span className="category-tag">
                                  {finding.category}
                                </span>
                              <p>{finding.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                      <div className="insight-card">
                        <h4>
                          <Database size={18} className="card-icon" /> 
                            Information Sources
                          </h4>
                        <div className="sources-list">
                            {selectedResearch.sources.map((source, index) => (
                            <div key={index} className="source-item">
                              <div className="source-header">
                                <p className="source-name">{source.name}</p>
                                <span className={`reliability-badge ${
                                  source.reliability > 90 ? 'high' :
                                  source.reliability > 80 ? 'medium' :
                                  'low'
                                }`}>
                                  {source.reliability}% Reliability
                                  </span>
                              </div>
                              <p className="source-meta">{source.type} • {source.date}</p>
                              </div>
                            ))}
                        </div>
                        </div>
                      </div>
                    </div>
                    
                  <div className="opportunities-section">
                    <h3>Market Opportunities</h3>
                    <div className="opportunities-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Opportunity</th>
                            <th>Market Size</th>
                            <th>Competition</th>
                            <th>Timeline</th>
                            <th>Actions</th>
                            </tr>
                          </thead>
                        <tbody>
                            {selectedResearch.marketOpportunities.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="opportunity-name">{item.opportunity}</div>
                                </td>
                              <td>
                                <span className={`size-badge ${item.size.toLowerCase()}`}>
                                    {item.size}
                                  </span>
                                </td>
                              <td>
                                <span className={`competition-badge ${item.competition.toLowerCase()}`}>
                                    {item.competition}
                                  </span>
                                </td>
                              <td>{item.timeline}</td>
                              <td>
                                <button className="explore-button">Explore</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'internal' && (
                <div className="tab-content">
                  <div className="integration-notice">
                    <Zap size={20} className="notice-icon" />
                  <div>
                      <h3>Integrated Analysis</h3>
                      <p>This analysis combines external research with internal MINISO data from Insight, KOC&KOL, Content Distribution, and Private Domain modules to provide comprehensive strategic recommendations.</p>
                    </div>
                  </div>
                  
                  <div className="data-insights-grid">
                    <div className="data-card">
                      <h3>Top Performing Disney Characters</h3>
                      <div className="performance-chart">
                        {selectedResearch.internalDataInsights.topPerformingCharacters.map((character, index) => (
                          <div key={index} className="performance-item">
                            <div className="performance-header">
                              <span>{character.name}</span>
                              <span>{character.performance}%</span>
                            </div>
                            <div className="performance-bar-bg">
                              <div className="performance-bar" style={{ width: `${character.performance}%` }}></div>
                        </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="data-card">
                      <h3>Channel Performance</h3>
                      <div className="channel-list">
                        {selectedResearch.internalDataInsights.channelPerformance.map((channel, index) => (
                          <div key={index} className="channel-item">
                            <div className="channel-header">
                              <span>{channel.channel}</span>
                            </div>
                            <div className="channel-metrics">
                              <div className="metric">
                                <div className="metric-header">
                                      <span>Engagement Rate</span>
                                      <span>{channel.engagement}%</span>
                                    </div>
                                <div className="metric-bar-bg">
                                  <div className="engagement-bar" style={{ width: `${channel.engagement}%` }}></div>
                                    </div>
                                  </div>
                              <div className="metric">
                                <div className="metric-header">
                                      <span>Conversion Rate</span>
                                      <span>{channel.conversion}%</span>
                                    </div>
                                <div className="metric-bar-bg">
                                  <div className="conversion-bar" style={{ width: `${channel.conversion * 10}%` }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                    
                  <div className="strategy-section">
                    <h3>KOC Strategy Effectiveness</h3>
                    <div className="strategy-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Strategy</th>
                            <th>Effectiveness</th>
                            <th>Implementation Level</th>
                            <th>Gap</th>
                            </tr>
                          </thead>
                        <tbody>
                            {selectedResearch.internalDataInsights.kocStrategy.map((strategy, index) => {
                              const gap = strategy.effectiveness - strategy.implementation;
                              return (
                              <tr key={index}>
                                <td>
                                  <div className="strategy-name">{strategy.strategy}</div>
                                  </td>
                                <td>
                                  <div className="metric-display">
                                    <div className="metric-bar-bg small">
                                      <div className="effectiveness-bar" style={{ width: `${strategy.effectiveness}%` }}></div>
                                    </div>
                                    <span>{strategy.effectiveness}%</span>
                                    </div>
                                  </td>
                                <td>
                                  <div className="metric-display">
                                    <div className="metric-bar-bg small">
                                      <div className="implementation-bar" style={{ width: `${strategy.implementation}%` }}></div>
                                    </div>
                                    <span>{strategy.implementation}%</span>
                                    </div>
                                  </td>
                                <td>
                                  <span className={`gap-badge ${
                                    gap > 20 ? 'high' :
                                    gap > 10 ? 'medium' :
                                    'low'
                                    }`}>
                                      {gap}%
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                  <div className="cross-module-insights">
                    <h4>
                      <Clipboard size={18} className="insights-icon" /> 
                        Cross-Module Insights
                      </h4>
                    <div className="insights-list">
                      <div className="insight-item">
                        <Tag size={14} className="tag-icon" />
                        <p>
                          <span className="module-name">Insight + KOC&KOL:</span> Disney character preferences from VOC analysis align with KOC content performance, suggesting natural synergy.
                          </p>
                        </div>
                      <div className="insight-item">
                        <Tag size={14} className="tag-icon" />
                        <p>
                          <span className="module-name">Content Distribution + Private Domain:</span> Disney product ads show higher conversion rates in markets where landing pages have been optimized with character-specific content.
                          </p>
                        </div>
                      <div className="insight-item">
                        <Tag size={14} className="tag-icon" />
                        <p>
                          <span className="module-name">KOC&KOL + Content Distribution:</span> Limited edition unboxing videos on TikTok generated 38% higher ad recall than standard product showcases.
                        </p>
                      </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'recommendations' && (
                <div className="tab-content">
                  <div className="recommendations-section">
                    <h3>Strategic Recommendations</h3>
                    <div className="recommendations-list">
                        {selectedResearch.recommendations.map((recommendation, index) => (
                        <div key={index} className="recommendation-card">
                          <div className="recommendation-icon">
                            <TrendingUp size={16} className={`icon-${recommendation.priority.toLowerCase()}`} />
                              </div>
                          <div className="recommendation-content">
                            <p className="recommendation-text">{recommendation.text}</p>
                            <div className="recommendation-tags">
                              <span className={`tag priority-${recommendation.priority.toLowerCase()}`}>
                                    Priority: {recommendation.priority}
                                  </span>
                              <span className={`tag impact-${recommendation.impact.toLowerCase()}`}>
                                    Impact: {recommendation.impact}
                                  </span>
                              <span className={`tag effort-${recommendation.effort.toLowerCase()}`}>
                                    Effort: {recommendation.effort}
                                  </span>
                                </div>
                              </div>
                          <div className="recommendation-actions">
                            <button className="action-icon comment">
                                  <MessageCircle size={16} />
                                </button>
                            <button className="action-icon approve">
                                  <Check size={16} />
                                </button>
                            <button className="action-icon reject">
                                  <X size={16} />
                                </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  <div className="roadmap-section">
                    <h3>Implementation Roadmap</h3>
                    <div className="roadmap-timeline">
                      <div className="timeline-item current">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>Q2 2025: Initial Implementation</h4>
                          <p>
                                Launch TikTok campaign for limited edition Disney collections and optimize landing pages for character-specific content.
                              </p>
                            </div>
                          </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>Q3 2025: Expansion</h4>
                          <p>
                                Develop sustainable Disney product line and begin development of AR experiences for physical products.
                              </p>
                            </div>
                          </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>Q4 2025: Regional Customization</h4>
                          <p>
                                Launch regional Disney character collections based on local preferences identified through KOC feedback.
                              </p>
                            </div>
                          </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>Q1 2026: Innovation Phase</h4>
                          <p>
                                Test Disney digital collectibles with physical product bundles and evaluate performance-based licensing models.
                              </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepResearch;