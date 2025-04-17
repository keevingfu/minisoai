import React from 'react';
import { Zap, Clipboard, Tag } from 'lucide-react';

const MinisoDataIntegrationTab = ({ selectedResearch }) => {
  // 确保internalDataInsights存在，如果不存在则提供默认值
  const internalData = selectedResearch.internalDataInsights || {
    topPerformingCharacters: [],
    channelPerformance: [],
    kocStrategy: []
  };
  
  // 如果数组为空，提供默认数据
  const characters = internalData.topPerformingCharacters.length > 0 ? 
    internalData.topPerformingCharacters : 
    [
      { name: "Mickey Mouse", performance: 92 },
      { name: "Winnie the Pooh", performance: 87 },
      { name: "Stitch", performance: 83 },
      { name: "Donald Duck", performance: 78 }
    ];
    
  const channels = internalData.channelPerformance.length > 0 ?
    internalData.channelPerformance :
    [
      { channel: "TikTok", engagement: 78, conversion: 6.2 },
      { channel: "Instagram", engagement: 65, conversion: 4.8 },
      { channel: "WeChat", engagement: 82, conversion: 7.5 }
    ];
    
  const strategies = internalData.kocStrategy.length > 0 ?
    internalData.kocStrategy :
    [
      { strategy: "Character-themed unboxing", effectiveness: 85, implementation: 60 },
      { strategy: "Limited edition collections", effectiveness: 92, implementation: 75 },
      { strategy: "Campus influencer program", effectiveness: 78, implementation: 45 }
    ];
  return (
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
            {characters.map((character, index) => (
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
            {channels.map((channel, index) => (
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
              {strategies.map((strategy, index) => {
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
  );
};

export default MinisoDataIntegrationTab;
