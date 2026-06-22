import React from 'react';
import { ShieldCheck, Mail, Shield, Check, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const getIsTamil = () => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; googtrans=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift().endsWith('/ta');
      }
    } catch (e) {}
    return false;
  };

  const isTamil = getIsTamil();

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--bg-main)',
      paddingBottom: '80px'
    },
    header: {
      backgroundColor: 'var(--bg-dark)',
      backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      padding: '100px 24px 140px 24px',
      textAlign: 'center',
      color: '#ffffff',
      position: 'relative'
    },
    shieldIcon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      border: '2px dashed #fbbf24',
      marginBottom: '20px',
      color: '#fbbf24'
    },
    title: {
      fontFamily: 'var(--font-heading)',
      fontSize: '3.5rem',
      fontWeight: '850',
      marginBottom: '16px',
      letterSpacing: '-0.02em',
      color: '#ffffff'
    },
    titleYellow: {
      color: '#fbbf24'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#94a3b8',
      maxWidth: '600px',
      margin: '0 auto',
      fontWeight: '500'
    },
    card: {
      maxWidth: '900px',
      margin: '-80px auto 0 auto',
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-premium)',
      border: '1px solid var(--border-light)',
      padding: '56px',
      position: 'relative',
      zIndex: '10'
    },
    section: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '1.6rem',
      fontWeight: '750',
      color: 'var(--bg-dark)',
      marginBottom: '20px',
      borderBottom: '2px solid var(--border-light)',
      paddingBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    text: {
      fontSize: '1.05rem',
      color: 'var(--text-main)',
      lineHeight: '1.8',
      marginBottom: '20px'
    },
    list: {
      listStyle: 'none',
      paddingLeft: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      fontSize: '1.05rem',
      lineHeight: '1.6'
    },
    checkIcon: {
      color: '#10b981',
      marginTop: '4px',
      flexShrink: 0
    },
    bulletIcon: {
      color: 'var(--primary)',
      marginTop: '4px',
      flexShrink: 0
    },
    boldLabel: {
      fontWeight: '700',
      color: 'var(--bg-dark)'
    },
    contactCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '24px',
      backgroundColor: 'var(--bg-main)',
      borderRadius: 'var(--radius-md)',
      marginTop: '20px',
      border: '1px solid var(--border-light)'
    },
    contactIcon: {
      backgroundColor: 'var(--primary-glow)',
      color: 'var(--primary)',
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    contactEmail: {
      fontWeight: '700',
      color: 'var(--primary)',
      textDecoration: 'none',
      fontSize: '1.1rem'
    }
  };

  return (
    <div style={styles.container} className="fade-in">
      <div style={styles.header}>
        <div style={styles.shieldIcon} className="floating-badge">
          <ShieldCheck size={36} />
        </div>
        <h1 style={styles.title}>
          {isTamil ? 'தனியுரிமைக் ' : 'Privacy '}
          <span style={styles.titleYellow}>{isTamil ? 'கொள்கை' : 'Policy'}</span>
        </h1>
        <p style={styles.subtitle}>
          {isTamil 
            ? 'உங்கள் தனியுரிமை எங்களுக்கு முக்கியமானது. உங்கள் தரவை எவ்வாறு பாதுகாக்கிறோம் என்பதைப் பற்றி தெரிந்துகொள்ளுங்கள்.' 
            : 'Your privacy is important to us. Learn how we protect your data.'}
        </p>
      </div>

      <div style={styles.card} className="privacy-card">
        {/* Introduction */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <FileText size={22} className="text-primary" />
            {isTamil ? 'அறிமுகம்' : 'Introduction'}
          </h2>
          <p style={styles.text}>
            {isTamil ? (
              <>
                <span className="notranslate">தி தெரபி யூனிவர்ஸ்</span>-க்கு உங்களை வரவேற்கிறோம். நாங்கள் உங்கள் தனியுரிமையை மதிக்கிறோம் மற்றும் உங்கள் தனிப்பட்ட தரவைப் பாதுகாப்பதில் உறுதியாக உள்ளோம். நீங்கள் எங்கள் வலைத்தளத்தைப் பார்வையிடும்போது உங்கள் தனிப்பட்ட தரவை நாங்கள் எவ்வாறு கவனித்துக்கொள்கிறோம் மற்றும் உங்கள் தனியுரிமை உரிமைகளைப் பற்றி இந்த தனியுரிமைக் கொள்கை உங்களுக்குத் தெரிவிக்கும்.
              </>
            ) : (
              <>
                Welcome to <span className="notranslate">THE THERAPY UNIVERSE</span>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
              </>
            )}
          </p>
        </div>

        {/* 1. Data We Collect */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Shield size={22} />
            {isTamil ? '1. நாங்கள் சேகரிக்கும் தரவு' : '1. Data We Collect'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'உங்களைப் பற்றிய பல்வேறு வகையான தனிப்பட்ட தரவுகளை நாங்கள் சேகரிக்கலாம், பயன்படுத்தலாம், சேமிக்கலாம் மற்றும் மாற்றலாம், அவை பின்வருமாறு வகைப்படுத்தப்பட்டுள்ளன:'
              : 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:'}
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                <span style={styles.boldLabel}>{isTamil ? 'அடையாளத் தரவு (Identity Data): ' : 'Identity Data: '}</span>
                {isTamil 
                  ? 'முதல் பெயர், கடைசி பெயர், பயனர்பெயர் அல்லது அதுபோன்ற அடையாளங்காட்டி அடங்கும்.' 
                  : 'includes first name, last name, username or similar identifier.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                <span style={styles.boldLabel}>{isTamil ? 'தொடர்புத் தரவு (Contact Data): ' : 'Contact Data: '}</span>
                {isTamil 
                  ? 'பில்லிங் முகவரி, விநியோக முகவரி, மின்னஞ்சல் முகவரி மற்றும் தொலைபேசி எண்கள் அடங்கும்.' 
                  : 'includes billing address, delivery address, email address and telephone numbers.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                <span style={styles.boldLabel}>{isTamil ? 'பரிவர்த்தனை தரவு (Transaction Data): ' : 'Transaction Data: '}</span>
                {isTamil 
                  ? 'உங்களுக்கான மற்றும் உங்களிடமிருந்து பணம் செலுத்துதல் பற்றிய விவரங்கள் மற்றும் எங்களிடமிருந்து நீங்கள் வாங்கிய தயாரிப்புகள் மற்றும் சேவைகளின் பிற விவரங்கள் அடங்கும்.' 
                  : 'includes details about payments to and from you and other details of products and services you have purchased from us.'}
              </div>
            </li>
          </ul>
        </div>

        {/* 2. How We Use Your Data */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <ShieldCheck size={22} />
            {isTamil ? '2. உங்கள் தரவை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்' : '2. How We Use Your Data'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'சட்டம் அனுமதிக்கும் போது மட்டுமே நாங்கள் உங்கள் தனிப்பட்ட தரவைப் பயன்படுத்துவோம். பொதுவாக, பின்வரும் சூழ்நிலைகளில் உங்கள் தனிப்பட்ட தரவைப் பயன்படுத்துவோம்:'
              : 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:'}
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'நாங்கள் உங்களுடன் செய்யவிருக்கும் அல்லது செய்துகொண்ட ஒப்பந்தத்தை நிறைவேற்ற வேண்டிய இடத்தில்.' 
                  : 'Where we need to perform the contract we are about to enter into or have entered into with you.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'எங்கள் நியாயமான நலன்களுக்காக (அல்லது ஒரு மூன்றாம் தரப்பினரின் நலன்களுக்காக) தேவைப்படும் இடத்தில் மற்றும் உங்கள் நலன்கள் மற்றும் அடிப்படை உரிமைகள் அந்த நலன்களை விட மேலோங்காத போது.' 
                  : 'Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'நாங்கள் ஒரு சட்டபூர்வமான கடமைக்கு இணங்க வேண்டிய இடத்தில்.' 
                  : 'Where we need to comply with a legal obligation.'}
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Data Security */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <ShieldCheck size={22} />
            {isTamil ? '3. தரவு பாதுகாப்பு' : '3. Data Security'}
          </h2>
          <p style={styles.text}>
            {isTamil ? (
              <>
                உங்கள் தனிப்பட்ட தரவு தற்செயலாக இழக்கப்படுவதையோ, பயன்படுத்தப்படுவதையோ அல்லது அங்கீகரிக்கப்படாத வகையில் அணுகப்படுவதையோ, மாற்றப்படுவதையோ அல்லது வெளிப்படுத்தப்படுவதையோ தடுப்பதற்கான தகுந்த பாதுகாப்பு நடவடிக்கைகளை நாங்கள் நடைமுறைப்படுத்தியுள்ளோம். கூடுதலாக, உங்கள் தனிப்பட்ட தரவை அறிந்து கொள்ள வேண்டிய வணிகத் தேவை உள்ள ஊழியர்கள், முகவர்கள், ஒப்பந்தக்காரர்கள் மற்றும் பிற மூன்றாம் தரப்பினருக்கு மட்டுமே நாங்கள் அணுகலை வரம்பிடுகிறோம்.
              </>
            ) : (
              <>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </>
            )}
          </p>
        </div>

        {/* 4. Contact Us */}
        <div style={{ ...styles.section, marginBottom: 0 }}>
          <h2 style={styles.sectionTitle}>
            <Mail size={22} />
            {isTamil ? '4. எங்களைத் தொடர்பு கொள்ள' : '4. Contact Us'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'இந்த தனியுரிமைக் கொள்கை அல்லது எங்கள் தனியுரிமை நடைமுறைகள் குறித்து உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், எங்களை தொடர்பு கொள்ளவும்:'
              : 'If you have any questions about this privacy policy or our privacy practices, please contact us at:'}
          </p>
          <div style={styles.contactCard}>
            <div style={styles.contactIcon}>
              <Mail size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{isTamil ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}</div>
              <a href="mailto:balasurya430809@gmail.com" style={styles.contactEmail}>
                balasurya430809@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .privacy-card {
            padding: 32px 24px !important;
            margin-top: -60px !important;
            border-radius: var(--radius-md) !important;
          }
        }
      `}</style>
    </div>
  );
}
