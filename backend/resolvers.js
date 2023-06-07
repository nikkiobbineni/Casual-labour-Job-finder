const User = require('./jobposter');
const Jobs = require('./newjob');
const Responses = require('./response');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      return users;
    },
    jobs: async () => {
      const jobs = await Jobs.find();
      return jobs;
    },
    responses: async () => {
      const responses = await Responses.find();
      return responses;
    },
    jobsByLocationAndTag: async (_, { location, tag }) => {
      const jobs = await Jobs.find({
        location,
        tags: { $regex: new RegExp(tag, 'i') }
      }).sort({ createdAt: 1 }).limit(3);
      console.log(jobs)
      return jobs;
    }
  },
  Mutation: {
    createJobPartOne: async (_, { input }) => {
      const job = new Jobs({
        title: input.title,
        poc: input.poc,
        tags: input.tags,
        description: input.description,
        username: input.username,
        createdAt: input.createdAt
      });
      console.log("new job created - part one");
      await job.save();
      console.log(job.id)
      return job;
    },
    createJobPartTwo: async (_, { input }) => {
      const { id, wages, vacancies, startdate, enddate, area, location } = input;
      const job = await Jobs.findById(input.id);
      console.log(input.id)
      if (!job) {

        return { error: "Job not found" };
      }
      job.wages = input.wages;
      job.vacancies = input.vacancies;
      job.startdate = input.startdate;
      job.enddate = input.enddate;
      job.phonenumber=input.phonenumber;
      job.email=input.email;
      job.area = input.area;
      job.location = input.location;
      console.log("job updated - part two");
      await job.save();
      return job;
    },
    createUser: async (_, { input }) => {
      const { username, password, fname, lname, email } = input;
      const userb = await User.findOne({ username });
      if (userb) {
        return { error: "Username already in use" };
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = new User({ fname, lname, username, email, password: hash });
      console.log("new user entered")
      await user.save();
      return user;
    },
    updateProfile: async (_, { input }) => {
      const { id } = input;
      const user = await User.findById(id);
      if (!user) {
        return { error: "User not found" };
      }
      const { username } = input;
      const userWithSameUsername = await User.findOne({ username });
      if (userWithSameUsername && userWithSameUsername._id.toString() !== id) {
        return { error: "Username already in use" };
      }
      console.log(user.username)
      await Jobs.updateMany({ username: user.username }, { $set: { username } });
      await Responses.updateMany({ username: user.username }, { $set: { username } });
      user.set(input);
      await user.save();
      return user;
    },
    updateJob: async (_, { input }) => {
      const { id } = input;
      const user = await Jobs.findById(id);
      console.log("updateJob")
      user.set(input);
      await user.save();
      return user;
    },
    createResponse: async (_, { input }) => {
      const response = new Responses(input);
      console.log("new user entered")
      await response.save();
      return response;
    },
    deleteUser: async (_, { input }) => {
      const { username } = input;
      const user = await User.findOne({ username });
      if (!user) {
        return { error: "User not found" };
      }
      await Jobs.deleteMany({ username: username });
      const deletedUser = await User.deleteOne({ username: username });
      console.log(deletedUser)
      if (deletedUser.length === 1) {
        return username;
      } else {
        return { error: "Error deleting user" };
      }
    },
    deleteJob: async (_, { input }) => {
      const { id } = input;

      // Find the job to be deleted
      const job = await Jobs.findById(id);
      if (!job) {
        return { error: "Job not found" };
      }
      // Delete all responses related to the job
      await Responses.deleteMany({ jobid: id });

      // Delete the job
      const deletedJob = await Jobs.deleteOne({ _id: id });
      console.log(deletedJob);

      if (deletedJob.deletedCount === 1) {
        return job;
      } else {
        return { error: "Error deleting job" };
      }
    },
    getJobDetails: async (_, { input }) => {
      const { id } = input;
      try {
        const job = await Jobs.findById(id);
        if (!job) {
          console.log(`Job with ID ${id} not found`);
          return null;
        }
        console.log("Job found:", job);
        return job;
      } catch (err) {
        console.error(`Error while getting job with ID ${id}:`, err);
        return null;
      }
    },
    getJobResponses: async (_, { input }) => {
      const { jobid } = input;
      try {
        const jobResponses = await Responses.find({ jobid });
        console.log(jobResponses);
        return { data: jobResponses };
      } catch (err) {
        console.error(`Error while getting responses for job with ID ${jobid}:`, err);
        return { message: `Error while getting responses for job with ID ${jobid}` };
      }
    },

    getProfile: async (_, { input }) => {
      const { username } = input;
      try {
        // console.log(username)
        const user = await User.findOne({ username });
        if (!user) {
          console.log(`User with ID ${username} not found`);
          return null;
        }
        // console.log("User found:", user);
        return user;
      } catch (err) {
        console.error(`Error while getting job with ID ${id}:`, err);
        return null;
      }
    },
    getJobCount: async (_, { input }) => {
      const { username } = input;
      try {
        const jobs = await Jobs.find({ username });
        id = jobs.length
        console.log(id)
        return id;
      } catch (err) {
        console.error(`Error while getting job count for username ${username}:`, err);
        return null;
      }
    },
    getResponseCount: async (_, { input }) => {
      const { username } = input;
      try {
        const jobs = await Responses.find({ username });
        id = jobs.length
        console.log(id)
        return id;
      } catch (err) {
        console.error(`Error while getting job count for username ${username}:`, err);
        return null;
      }
    },
    checkCredentials: async (_, { input }) => {
      try {
        const { username, password } = input;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).send({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(401).send({ error: "Invalid credentials" });
        }
    
        console.log("yes");
        return user;
      } catch (error) {
        res.status(500).send({ error: "An error occurred while adding credentials" });
      }
    },
  },
};

module.exports = resolvers;
