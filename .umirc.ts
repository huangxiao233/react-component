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
      path: '/dashboard/rating',
      name: '星级评价组件',
      icon: 'dashboard',
      component: '@/pages/rating/index',
    },
    {
      path: '/dashboard/switch',
      name: 'switch组件',
      icon: 'dashboard',
      component: '@/pages/switch/index',
    },
  ],
  fastRefresh: {},
});
