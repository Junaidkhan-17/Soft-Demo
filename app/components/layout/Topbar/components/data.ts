/*import demo1 from '@/assets/img/demo/demo1.jpg'
import demo2 from '@/assets/img/demo/demo2.jpg'
import demo3 from '@/assets/img/demo/demo3.jpg'
import demo4 from '@/assets/img/demo/demo4.jpg'
import demo5 from '@/assets/img/demo/demo5.jpg'
import demo6 from '@/assets/img/demo/demo6.jpg'
import demo7 from '@/assets/img/demo/demo7.jpg'
import demo8 from '@/assets/img/demo/demo8.jpg'
import demo9 from '@/assets/img/demo/demo9.jpg'
import rtl from '@/assets/img/demo/rtl.png'*/

const menu = [
  {
    title: 'Home',
    icon: 'FaAngleDown',
    demos: [
      { 
        image: 'abc',//demo1,
        multiPage:'1' ,//'/home-1',
        onePage: '2',//'/single/home-1',
        title: '3',//'01. Time Tracker',
      },
      {
        
        image: 'Abc',//demo2,
        multiPage:'1',// '/home-2',
        onePage: '2',//'/single/home-2',
        title: '3',//'02. Web Page Builder',
      },
      { 
        image: 'abc',//demo3,
        multiPage: '1',//'/home-3',
        onePage: '2',//'/single/home-3',
        title: '3',//'03. POS Software',
      },
      {
        image: 'abc',//demo4,
        multiPage:'1', //'/home-4',
        onePage: '2',//'/single/home-4',
        title: '3',//'04. Password Manager',
      },
      {
        
        image: 'abc',//demo5,
        multiPage: '1',//'/home-5',
        onePage: '2',//'/single/home-5',
        title: '3',//'05. HR Software',
      },
      {
        image: 'abc',//demo6,
        multiPage: '1',//'/home-6',
        onePage: '2',//'/single/home-6',
        title: '3',//'06. Email Marketing',
      },
      {
        image: 'abc',//demo7,
        multiPage: '1',//'/home-7',
        onePage: '2',//'/single/home-7',
        title: '3',//'07. Project Management',
      },
      {
        image: 'abc',//demo8,
        multiPage: '1',//'/home-8',
        onePage: '2',//'/single/home-8',
        title: '3',//'08. SEO Software',
      },
      {
        image: 'abc',//demo9,
        multiPage: '1',//'/home-9',
        onePage: '2',//'/single/home-9',
        title: '3',//'09. Social Media',
      },
      /*{ image: rtl, multiPage: '/rtl', onePage: '/single/rtl', title: '10. RTL Version' },*/
    ]
  },
  {
    title: 'About Us',
    link: '/'/*'/about'*/,
  },
  {
    title: 'Pages',
    subMenu: [
      { title: 'Contact Us', link: '/contact' },
      { title: 'Features', link: '/features' },
      { title: 'Testimonial', link: '/testimonial' },
      { title: 'Pricing', link: '/pricing' },
      { title: 'Download', link: '/download' },
      { title: '404', link: '/error' },
    ],
  },
  {
    title: 'Blog',
    subMenu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Details Left', link: '/blog-details-sidebar-left' },
      { title: 'Details Right', link: '/blog-details-sidebar-right' },
      { title: 'Blog Details', link: '/blog-details' },
    ],
  },
  {
    title: 'Account',
    subMenu: [
      { title: 'Create Account', link: '/account' },
      { title: 'Login', link: '/login' },
      { title: 'Forgot', link: '/forgot' },
      { title: 'Reset', link: '/reset' },
      { title: 'Verify Email', link: '/verify' },
      { title: 'Success', link: '/form-success' },
    ],
  },
]


export default menu
