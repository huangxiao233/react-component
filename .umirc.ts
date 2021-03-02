import { defineConfig } from 'umi';
export default defineConfig({
  layout: {
    title: '京东健康',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      name: '',
      icon: 'dashboard',
      component: '@/pages/index',
    },
    {
      path: '/dashboard/handwrittenSignature',
      name: '手写签名组件',
      icon: 'dashboard',
      component: '@/pages/handwrittenSignature/index',
    },
    {
      path: '/dashboard/evaluation',
      name: '星级评价组件',
      icon: 'dashboard',
      component: '@/pages/evaluation/index',
    },
  ],
  fastRefresh: {},
});
