import express from 'express';
const router = express.Router();
const Data = {
  FirstName: 'KUNDWA',
  MiddleName: 'BRUNO',
  LastName: 'MATERNE',
  profile:
    'https://drive.google.com/file/d/1cKvBxZ4diZ85HRgwICAP_VbL0HjovjN-/preview',
  country: 'RWANDA',
  passion: 'Full Stack Web Developer',
  resumeLink: '',
  aboutMe:
    'Hi, I am Kundwa Bruno Materne, A web designer and builder based in RWANDA. I am a self taught web developer using a free lesson provider on the internet called freecodecamp.I enjoy building things out of scratch like website clones and hiring business websites and so much more! Some technologies that i have been working on recently!',
  professions: ['Websites', 'Web Applications', 'Mobile Apps', 'UI/UX design'],
  skills: [
    {
      name: 'HTML',
      logo: '<i className="fab fa-html5" />',
      color: '#EB6228',
    },
    {
      name: 'Javascript(ES6+)',
      logo: '<i className="fab fa-js-square" />',
      color: '#F0D91E',
    },
    {
      name: 'React js',
      logo: '<i className="fab fa-react" />',
      color: '#61DAFB',
    },
    {
      name: 'SASS',
      logo: '<i className="fab fa-sass" />',
      color: '#C96196',
    },
    {
      name: 'Node js',
      logo: '<i className="fab fa-node" />',
      color: '#6AA25B',
    },
    {
      name: 'CSS',
      logo: '<i className="fab fa-css3-alt" />',
      color: '#006DB4',
    },
  ],
  projects: [
    {
      name: 'Calculator',
      description:
        'A basic user friendly calculator built HTML and With javscript ES6+',
      technologies: ['VanillaJs', 'Sass'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },

    {
      name: 'Sample business webiste',
      description:
        'A building company website that sells building materials online (prototype/sample)',
      technologies: ['Javascript', 'Sass', 'NodeJS', 'ReactJs', 'Firebase'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },
    {
      name: 'Personal website V2.0',
      description:
        'My personal portfolio, That show cases my projects and skills',
      technologies: ['Javascript', 'Sass', 'NodeJS', 'ReactJS', 'Firebase'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },
    {
      name: 'Todo List App V1.0',
      description:
        'My personal portfolio, That show cases my projects and skills',
      technologies: ['Javascript', 'Sass', 'NodeJS', 'ReactJS', 'Firebase'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },
    {
      name: 'Phantom App',
      description:
        'This is an app that is used to track transport bus movements on any device, This app was built with the help of andela Team!',
      technologies: ['Javascript', 'Sass', 'NodeJS', 'ReactJS', 'Firebase'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },
    {
      name: 'Personal website V1.0',
      description:
        'My personal portfolio, That show cases my projects and skills',
      technologies: ['Javascript', 'HTML&CSS', 'NodeJS', 'Firebase'],
      ExternalLinks: [
        {
          name: 'Github',
          link: '',
        },
        {
          name: 'Go To',
          link: '',
        },
      ],
    },
  ],
  contacts: [
    {
      name: 'Github',
      info: 'Kundwa Bruno',
      icon: '<i className="fab fa-github" />',
    },
    {
      name: 'Instagram',
      info: 'bruno_kun',
      icon: '<i className="fab fa-instagram" />',
    },
    {
      name: 'Mail',
      info: 'kundwabruno@gmail.com',
      icon: '<i className="fas fa-envelope-open" />',
    },
    {
      name: 'Phone',
      info: '+250 789 070 593',
      icon: '<i className="fas fa-phone" />',
    },
  ],
};

//Get all comments
router.get('/', (req, res) => {
  res.send(Data);
});

export default router;
