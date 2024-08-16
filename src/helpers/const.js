export const newUserForm = [
  {
    label: 'First Name',
    name: 'firstName',
    rules: [
      {
        required: true,
        message: 'Please input your first name!',
      },
    ],
  },
  {
    label: 'Last Name',
    name: 'lastName',
    rules: [
      {
        required: true,
        message: 'Please input your last name!',
      },
    ],
  },
  {
    label: 'Location',
    name: 'location',
    rules: [
      {
        required: true,
        message: 'Please input your location!',
      },
    ],
  },
  {
    label: 'Email',
    name: 'email',
    rules: [
      {
        required: true,
        message: 'Please input your email!',
      },
      {
        type: 'email',
        message: 'Please enter a valid email!',
      },
    ],
  },
  {
    label: 'Cellphone',
    name: 'cellphone',
    rules: [
      {
        required: true,
        message: 'Please input your cellphone number!',
      },
      {
        pattern: /^[0-9]+$/,
        message: 'Please enter a valid cellphone number!',
      },
    ],
  },
  {
    label: 'Password',
    name: 'password',
    rules: [
      {
        required: true,
        message: 'Please input your password!',
      },
      {
        min: 6,
        message: 'Password must be at least 6 characters!',
      },
    ],
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
    ],
  },
];

export const petInfoForm = [
  {
    label: 'Name',
    name: 'name',
    rules: [
      {
        required: true,
        message: 'Please input the pet\'s name!',
      },
      {
        type: 'string',
        message: 'Name must be a valid string!',
      },
    ],
  },
  {
    label: 'Location',
    name: 'location',
    rules: [
      {
        required: true,
        message: 'Please input the pet\'s location!',
      },
      {
        type: 'string',
        message: 'Location must be a valid string!',
      },
    ],
  },
  {
    label: 'Age',
    name: 'age',
    rules: [
      {
        required: true,
        message: 'Please input the pet\'s age!',
      },
      {
        type: 'number',
        message: 'Age must be a valid number!',
      },
    ],
  },
  {
    label: 'Weight',
    name: 'weight_kg',
    rules: [
      {
        required: true,
        message: 'Weight is optional!',
      },
      {
        type: 'number',
        message: 'Weight must be a valid number!',
      },
    ],
  },
  {
    label: 'Sickness',
    name: 'sickness',
    rules: [
      {
        required: false,
        message: 'Sickness information is optional!',
      },
      {
        type: 'string',
        message: 'Sickness must be a valid string!',
      },
    ],
  },
  {
    label: 'Vaccinated',
    name: 'vaccinated',
    rules: [
      {
        required: true,
        message: 'Please specify if the pet is vaccinated!',
      },
      {
        type: 'boolean',
        message: 'Vaccinated must be either true or false!',
      },
    ],
  },
];

export const filterConfig = [
  {
    key: 'type',
    placeholder: 'Type',
    options: ['dog', 'cat'],
    width: 120
  },
  {
    key: 'location',
    placeholder: 'Location',
    options: ['Zapopan', 'Guadalajara', 'NY', 'LA'],
    width: 180,
    showSearch: true
  },
  {
    key: 'age',
    placeholder: 'Age',
    options: ['puppy', 'adult'],
    width: 120
  },
  {
    key: 'size',
    placeholder: 'Size',
    options: ['small', 'large'],
    width: 120
  }
];
