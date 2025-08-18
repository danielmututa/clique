// // src/utils/sms.ts
// import axios from 'axios';

// export const sendVerificationSMS = async (phone: string, code: string) => {
//   if (!/^\d{10,15}$/.test(phone)) {
//     throw new Error('Invalid phone number format');
//   }

//   const body = {
//     from: process.env.EASYSENDSMS_SENDER,
//     to: phone,
//     text: `Your verification code is ${code}`,
//     type: '0', // plain text
//   };

//   try {
//     const res = await axios.post(
//       'https://restapi.easysendsms.app/v1/rest/sms/send',
//       body,
//       {
//         headers: {
//           apikey: process.env.EASYSENDSMS_API_KEY!,
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       }
//     );

//     console.log(`📱 Verification code sent to ${phone}: ${code}`, res.data);
//     return res.data;
//   } catch (err: any) {
//     console.error(err.response?.data || err.message);
//     throw new Error('Failed to send SMS');
//   }
// };




import axios from 'axios';

// export const sendVerificationSMS = async (phone: string, code: string) => {
//   try {
//     // Remove "+" from phone number if it exists
//     const formattedPhone = phone.startsWith('+') ? phone.slice(1) : phone;

//     const response = await axios.post(
//       'https://restapi.easysendsms.app/v1/rest/sms/send',
//       {
//         from: process.env.EASYSENDSMS_SENDER, // e.g., "MyApp"
//         to: formattedPhone, // phone without "+"
//         text: `Your verification code is ${code}`,
//         type: '0', // standard SMS
//       },
//       {
//         headers: {
//           apikey: process.env.EASYSENDSMS_API_KEY,
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       }
//     );

//     console.log(`📱 Verification code sent to ${phone}: ${code}`);
//     console.log('EasySendSMS response:', response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error('Failed to send SMS:', error.response?.data || error.message);
//     throw new Error('Failed to send verification SMS');
//   }
// };




export const sendVerificationSMS = async (phone: string, code: string) => {
  const formattedPhone = phone.replace('+', ''); // remove plus sign

  await axios.post(
    'https://restapi.easysendsms.app/v1/rest/sms/send',
    {
      from: process.env.EASYSENDSMS_SENDER,  // default sender
      to: formattedPhone,
      text: `Your verification code is ${code}`,
      type: '0',  // normal SMS
    },
    {
      headers: {
        apikey: process.env.EASYSENDSMS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  console.log(`📱 Verification code sent to ${formattedPhone}: ${code}`);
};
