import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Email address is invalid")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Email address is invalid")
    .required("Email address is required"),
});

export const resetPasswordSchema = Yup.object().shape({
  token: Yup.string()
    .required("Token is required"),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),
  password_confirmation: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});


export const personalInfoSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Full name is required')
    .min(2, 'Name is too short'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\+?\d{7,15}$/, 'Enter a valid phone number'),

  gender: Yup.string()
    .required('Gender is required'),

  country: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required()
  }).required('Country is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const menteeProInfo = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  employer: Yup.string().required('Employer is required'),
  level: Yup.string().required('Level is required'),
  expertise: Yup.array().min(1, 'At least one expertise is required'),
  bio: Yup.string().required('Bio is required'),
});

export const mentorProInfo = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title must be at most 100 characters'),

  employer: Yup.string()
    .required('Company/School is required')
    .max(100, 'Employer must be at most 100 characters'),

  linkedin_url: Yup.string()
    .url('Invalid LinkedIn URL')
    .nullable()
    .notRequired(),

  yrs_of_experience: Yup.number()
    .nullable()
    .typeError('Years of experience must be a number')
    .min(0, 'Must be at least 0')
    .max(50, 'Must be 50 or less'),

  months_of_experience: Yup.number()
    .nullable()
    .typeError('Months of experience must be a number')
    .min(0, 'Must be at least 0')
    .max(11, 'Must be less than 12'),

  level: Yup.string()
    .required('Experience level is required'),

  bio: Yup.string()
    .required('Short bio is required')
    .max(500, 'Bio must be at most 500 characters'),
});

export const mentorExpertiseSchema = Yup.object().shape({
  expertise: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one area of expertise")
    .required("Expertise is required"),

  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one skill")
    .required("Skills are required"),

  industries: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one industry")
    .required("Industries are required"),

  tools: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one tool")
    .required("Tools are required"),
});

export const sessionSchema = (maxDuration: number) => {
  return Yup.object().shape({
    title: Yup.string().required("Title is required"),

    duration: Yup.number()
      .required("Duration is required")
      .min(1, "Duration must be at least 1 minute")
      .max(maxDuration, `Duration cannot exceed ${maxDuration} minutes`),

    sessions_count: Yup.number()
      .required("Sessions count is required")
      .when('frequency', {
        is: 'one-time',
        then: (schema) => schema.oneOf([1], "Sessions count must be 1 for one-time sessions"),
        otherwise: (schema) => schema.min(1, "Sessions count must be at least 1"),
      }),

    frequency: Yup.string()
      .required("Frequency is required")
      .oneOf(["one-time", "weekly", "fortnightly", "monthly"], "Invalid frequency"),

    price: Yup.string()
      .required("Price is required")
      .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid amount"),

    description: Yup.string().required("Description is required"),
  });
};

export const withdrawalSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
  password: Yup.string()
    .required("Password is required")
});


// PROFILE
export const profilePersonalInfoSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name can't be more than 50 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\+?\d{7,15}$/, 'Enter a valid phone number'),

  gender: Yup.string()
    .oneOf(["male", "female"], "Select a valid gender")
    .required("Gender is required"),

  country: Yup.object()
    .nullable()
    .shape({
      value: Yup.string().required("Country is required"),
      label: Yup.string().required(),
    }),

  languages: Yup.array()
    .min(1, "Select at least one language")
    .required("Languages are required"),

  bio: Yup.string()
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio can't be more than 300 characters")
    .required("Bio is required"),
});


export const educationSchema = Yup.object().shape({
  education: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().nullable().uuid('Invalid ID format').notRequired(),
      institution: Yup.string().required('Institution is required').max(255, 'Institution name is too long'),
      degree: Yup.string().required('Degree is required').max(255, 'Degree name is too long'),
      field_of_study: Yup.string().nullable().max(255, 'Field of study is too long'),
      start_date: Yup.date().required('Start date is required'),
      end_date: Yup.date()
        .nullable()
        .min(Yup.ref('start_date'), 'End date cannot be before start date')
        .when('start_date', (start_date, schema) => {
          return start_date ? schema.nullable().notRequired() : schema;
        }),
    })
  ).min(1, 'At least one education entry is required'),
});

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup.string().required('Old password is required'),
  password: Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .matches(/\d/, 'Must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),
  password_confirmation: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const mentorProfileSchema = Yup.object().shape({
  title: Yup.string()
      .required("Title is required"),
  employer: Yup.string()
      .required("Company/School is required"),
  linkedin_url: Yup.string()
      .url("Enter a valid LinkedIn URL")
      .required("LinkedIn URL is required"),
  twitter_url: Yup.string()
      .url("Enter a valid Twitter URL"),
  website_url: Yup.string()
      .url("Enter a valid Website/Portfolio URL"),
  yrs_of_experience: Yup.number()
      .min(1, "Minimum 1 year")
      .max(30, "Maximum 30 years")
      .required("Years of experience is required"),
  months_of_experience: Yup.number()
      .min(1, "Minimum 1 month")
      .max(12, "Maximum 12 months")
      .required("Months of experience is required"),
  level: Yup.string()
      .oneOf(["Entry Level", "Mid Level", "Senior"], "Select a valid level")
      .required("Level of experience is required"),
})

export const ProfileExpertiseSchema = Yup.object().shape({
  expertise: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one expertise")
    .required("Expertise is required"),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one skill")
    .required("Skills are required"),
  industries: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one industry")
    .required("Industries are required"),
  tools: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one tool")
    .required("Tools are required"),
});

export const MenteeProfileSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Title must be at most 50 characters"),
  
  employer: Yup.string()
    .required("Company/School is required")
    .max(100, "Company/School must be at most 100 characters"),
  
  level: Yup.string()
    .oneOf(["Entry Level", "Mid Level", "Senior"], "Invalid level")
    .required("Level of experience is required"),
  
  expertise: Yup.array().of(Yup.string()),

  skills: Yup.array().of(Yup.string()),

  industries: Yup.array().of(Yup.string()),
});

export const workExperienceSchema = Yup.object().shape({
  work_experiences: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().nullable(),
      employer: Yup.string().required('Employer is required').max(255),
      title: Yup.string().required('Job title is required').max(255),
      description: Yup.string().nullable(),
      start_date: Yup.date().required('Start date is required'),
      end_date: Yup.date()
        .nullable()
        .when('is_current', {
          is: false,
          then: (schema) => schema.required('End date is required').min(
            Yup.ref('start_date'), 
            'End date cannot be before start date'
          )
        }),
      is_current: Yup.boolean()
    })
  ).max(5, 'You can only add up to 5 work experiences')
});