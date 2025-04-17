import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Zap, Database } from 'lucide-react';

const OverviewTab = ({ selectedResearch }) => {
  // 确保必要的属性存在，如果不存在则提供默认值
  const summary = selectedResearch.summary || "No summary available";
  
  // 如果keyFindings数组为空，提供默认数据
  const keyFindings = selectedResearch.keyFindings && selectedResearch.keyFindings.length > 0 ? 
    selectedResearch.keyFindings : 
    [
      { category: 'Trend', text: 'Growing demand for eco-friendly stationery products among Gen Z consumers' },
      { category: 'Market', text: 'Character-based merchandise continues to drive high engagement and conversion rates' }
    ];
    
  // 如果sources数组为空，提供默认数据
  const sources = selectedResearch.sources && selectedResearch.sources.length > 0 ?
    selectedResearch.sources :
    [
      { name: "Industry Report 2025", type: "Market Research", date: "2025", reliability: 92 },
      { name: "Consumer Survey", type: "User Research", date: "2025", reliability: 88 }
    ];
    
  // 如果marketOpportunities数组为空，提供默认数据
  const marketOpportunities = selectedResearch.marketOpportunities && selectedResearch.marketOpportunities.length > 0 ?
    selectedResearch.marketOpportunities :
    [
      { opportunity: "Eco-friendly stationery with character designs", size: "Large", competition: "Medium", timeline: "Q2 2025" },
      { opportunity: "Campus-themed limited collections", size: "Medium", competition: "Low", timeline: "Q3 2025" }
    ];
  return (
    <div className="tab-content">
      <div className="summary-section">
        <h3>Executive Summary</h3>
        <div className="markdown-content">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
        
        <div className="insights-grid">
          <div className="insight-card">
            <h4>
              <Zap size={18} className="card-icon" /> 
              Key Findings
            </h4>
            <div className="findings-list">
              {keyFindings.map((finding, index) => (
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
              {sources.map((source, index) => (
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
        
      {/* Competitor analysis section */}
      {selectedResearch.competitorAnalysis && (
        <div className="competitor-analysis-section">
          <h3>Competitor Analysis</h3>
          <div className="competitor-content">
            <p>{selectedResearch.competitorAnalysis}</p>
          </div>
        </div>
      )}
      
      {/* Consumer insights section */}
      {selectedResearch.consumerInsights && (
        <div className="consumer-insights-section">
          <h3>Consumer Insights</h3>
          <div className="consumer-content">
            <p>{selectedResearch.consumerInsights}</p>
          </div>
        </div>
      )}
        
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
              {marketOpportunities.map((item, index) => (
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
  );
};

export default OverviewTab;
