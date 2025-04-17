import React from 'react';
import { TrendingUp, MessageCircle, Check, X } from 'lucide-react';

const RecommendationsTab = ({ selectedResearch }) => {
  // 如果recommendations数组为空，提供默认数据
  const recommendations = selectedResearch.recommendations && selectedResearch.recommendations.length > 0 ? 
    selectedResearch.recommendations : 
    [
      { 
        text: "Launch limited edition Disney character collections targeting campus demographics", 
        priority: "High", 
        impact: "High", 
        effort: "Medium" 
      },
      { 
        text: "Develop sustainable packaging options for eco-conscious consumers", 
        priority: "Medium", 
        impact: "Medium", 
        effort: "Low" 
      },
      { 
        text: "Create AR experiences that connect physical products with digital content", 
        priority: "Medium", 
        impact: "High", 
        effort: "High" 
      },
      { 
        text: "Implement regional customization for Disney character preferences", 
        priority: "Low", 
        impact: "Medium", 
        effort: "Medium" 
      }
    ];
  return (
    <div className="tab-content">
      <div className="recommendations-section">
        <h3>Strategic Recommendations</h3>
        <div className="recommendations-list">
          {recommendations.map((recommendation, index) => (
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
  );
};

export default RecommendationsTab;
