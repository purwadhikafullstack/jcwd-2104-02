module.exports = {
  apps: [
    {
      name: 'JCWD-2104-02-BE', // Format JCWD-{batchcode}-{groupnumber}
      script: './packages/server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8402, //format groupnumber and batch ex: 8401
      },
      time: true,
    },
  ],
};
