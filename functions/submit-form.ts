import { Handler } from '@netlify/functions';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  project: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse and validate the form data
    const body = JSON.parse(event.body || '{}');
    const validatedData = contactFormSchema.parse(body);

    // Here you would typically:
    // 1. Save to a database
    // 2. Send an email notification
    // 3. Send a confirmation email to the user
    
    console.log('Contact form submission:', validatedData);
    
    // For now, just log the submission and return success
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      }),
    };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: false,
          message: 'Validation error',
          errors: error.errors,
        }),
      };
    }
    
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
    };
  }
};
