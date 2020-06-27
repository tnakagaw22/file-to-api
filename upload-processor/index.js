const Queue = require('bull');

const mappingQueue = new Queue('file mapping', 'redis://127.0.0.1:6379');

mappingQueue.process(async (job, done) => {

    console.log('start processing' + JSON.stringify(job.data))
    // job.data contains the custom data passed when the job was created
    // job.id contains id of this job.
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    // transcode video asynchronously and report progress
    job.progress(42);
  
    // call done when finished
    done(null, 'fdf');
  
    // // or give a error if error
    // done(new Error('error transcoding'));
  
    // // or pass it a result
    // done(null, { framerate: 29.5 /* etc... */ });
  
    // // If the job throws an unhandled exception it is also handled correctly
    // throw new Error('some unexpected error');
  });

  mappingQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
  })