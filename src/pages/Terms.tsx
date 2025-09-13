import React from 'react';

const Terms = () => {
  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground mb-4">
        These Terms & Conditions govern your use of YieldLink. By using the platform, you agree to these terms.
      </p>
      <div className="space-y-3 text-sm leading-6">
        <p><strong>Use of Service:</strong> You agree to use the service responsibly and comply with applicable laws.</p>
        <p><strong>Privacy:</strong> We process your data according to our privacy practices to provide and improve the service.</p>
        <p><strong>Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
        <p><strong>Changes:</strong> We may update these terms from time to time. Continued use constitutes acceptance.</p>
        <p><strong>Contact:</strong> For questions, contact support@yieldlink.africa.</p>
      </div>
    </div>
  );
};

export default Terms;


