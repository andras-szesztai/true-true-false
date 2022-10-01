import { defineConfig } from 'cypress'

export default defineConfig({
    projectId: '1wc953',

    e2e: {
        baseUrl: 'http://localhost:3000',
        projectId: '1wc953',
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})
