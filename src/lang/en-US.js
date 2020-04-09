export default {
  like: 'Like',
  article: 'Article',
  preview: 'Preview',
  areYouSure: 'Are you sure you want to exit?',
  myPosts: 'My Posts',
  likedPosts: 'Liked Posts',
  error: 'An error occured. Please contact to administrator',

  user: {
    login: 'Log in',
    loginWith: 'Login with ',
    logout: 'Log out',
    follow: 'Follow',
    follower: 'Follower',
  },
  
  post: {
    title: 'Title',
    tags: 'Tags',
    state: {
      published: 'Publish',
      private: 'Private',
      draft: 'Draft',
    },
    successful: 'Post has been successfully created!',
    failed: {
      title: 'Title is required',
      body: 'Body is required'
    },
  },

  newPost: {
    publish: 'Publish',
    save: 'Save',
    tagsWarn: 'Tags must be small letter alphabetical or numeric.',
  },

  header: {
    search: 'Search',
    newPost: 'New Post',
    settings: 'Settings',
    myPage: 'My page',
  },

  options: {
    save: 'Save',
    profile: 'Profile',
    account: 'Account',
    preference: 'Preference',
    uniqueName: 'User Name',
    uniqueNameWarn: 'Username must be small letter alphabetical, numeric or hyphen and at least 5 characters.',
    displayName: 'Display Name',
    tagline: 'Tagline',
    webSiteUrl: 'Website / Blog URL',
    location: 'Location',
    email: 'Email',
    link: 'Link',
    linked: 'Linked',
    language: 'Language',
  },

  validation: {
    uniqueName: 'Please enter your username according to the conditions.', // あってんのかこれ
    required: 'This field is required',
    email: '{_value_} is not in the form of an email address.',
    url: 'This field require "http://" or "https://".',
    max: '{_value_} is too long. It should be less than {length} characters.',
    min: '{_value_} is too short. It should be at least {length} characters.',
  },
}