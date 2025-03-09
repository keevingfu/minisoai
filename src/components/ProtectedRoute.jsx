import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * 受保护路由组件
 * 如果用户已登录，渲染子路由
 * 如果未登录，重定向到登录页面
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  
  // 如果用户未登录，重定向到登录页面
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // 如果已登录，渲染子路由
  return <Outlet />;
};

export default ProtectedRoute; 