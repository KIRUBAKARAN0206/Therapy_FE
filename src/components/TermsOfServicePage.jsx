import React from 'react';
import { Scale, Mail, Check, FileText, Activity } from 'lucide-react';

export default function TermsOfServicePage() {
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
    scaleIcon: {
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
        <div style={styles.scaleIcon} className="floating-badge">
          <Scale size={36} />
        </div>
        <h1 style={styles.title}>
          {isTamil ? 'சேவை ' : 'Terms of '}
          <span style={styles.titleYellow}>{isTamil ? 'விதிமுறைகள்' : 'Service'}</span>
        </h1>
        <p style={styles.subtitle}>
          {isTamil 
            ? 'எங்கள் தளத்தைப் பயன்படுத்துவதற்கு முன் விதிமுறைகளைப் படிக்கவும்.' 
            : 'Please review our terms and regulations before accessing our services.'}
        </p>
      </div>

      <div style={styles.card} className="privacy-card">
        {/* 1. Acceptance of Terms */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <FileText size={22} className="text-primary" />
            {isTamil ? '1. விதிமுறைகளை ஒப்புக்கொள்ளுதல்' : '1. Acceptance of Terms'}
          </h2>
          <p style={styles.text}>
            {isTamil ? (
              <>
                இந்த வலைத்தளத்தை அணுகுவதன் மூலமும் பயன்படுத்துவதன் மூலமும், இந்த ஒப்பந்தத்தின் விதிமுறைகள் மற்றும் நிபந்தனைகளுக்குக் கட்டுப்பட ஒப்புக்கொள்கிறீர்கள். மேலும், இந்த குறிப்பிட்ட சேவைகளைப் பயன்படுத்தும்போது, அத்தகைய சேவைகளுக்குப் பொருந்தக்கூடிய எந்தவொரு வெளியிடப்பட்ட வழிகாட்டுதல்கள் அல்லது விதிகளுக்கு நீங்கள் உட்பட்டவராவீர்கள்.
              </>
            ) : (
              <>
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these clinical services, you shall be subject to any posted guidelines or rules applicable to such services.
              </>
            )}
          </p>
        </div>

        {/* 2. Booking and Payments */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Check size={22} />
            {isTamil ? '2. முன்பதிவு மற்றும் கட்டணங்கள்' : '2. Booking and Payments'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'அனைத்து முன்பதிவுகளும் நேர ஒதுக்கீட்டின் இருப்பு மற்றும் உறுதிப்படுத்தலுக்கு உட்பட்டவை:'
              : 'All bookings are subject to availability and confirmation:'}
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                {isTamil 
                  ? 'அனைத்து சிகிச்சை அமர்வுகளும் நேர ஒதுக்கீட்டின் உறுதிப்படுத்தலுக்கு உட்பட்டது.' 
                  : 'All clinical and home rehabilitation sessions are subject to slot availability and confirmation.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                {isTamil 
                  ? 'வீட்டு சிகிச்சை அமர்வுகளை உறுதி செய்ய குறைந்தபட்ச முன்பணம் தேவைப்படலாம்.' 
                  : 'A booking deposit or confirmation is required to finalize home rehabilitation appointments.'}
            </div>
            </li>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                {isTamil 
                  ? 'சிகிச்சையின் வகை அல்லது தேர்ந்தெடுக்கப்பட்ட தொகுப்பின் அடிப்படையில் இறுதி கட்டணம் கணக்கிடப்படும்.' 
                  : 'The final session fee will be calculated based on the specific treatment type or therapy package selected.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <Check size={18} style={styles.checkIcon} />
              <div>
                {isTamil 
                  ? 'வீட்டு சிகிச்சைகளுக்கான பயணக் கட்டணங்கள் மற்றும் கூடுதல் மருத்துவப் பொருட்கள் (பொருந்தினால்) வாடிக்கையாளரால் செலுத்தப்பட வேண்டும்.' 
                  : 'Any additional clinical supplies, specialized support, or travel charges for home visits (if applicable) are to be paid by the patient unless otherwise specified.'}
              </div>
            </li>
          </ul>
        </div>

        {/* 3. Cancellations and Rescheduling */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Activity size={22} />
            {isTamil ? '3. முன்பதிவு ரத்து மற்றும் பணத்தைத் திரும்பப் பெறுதல்' : '3. Cancellations and Rescheduling'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'முன்பதிவை ரத்து செய்தல் மற்றும் மாற்றுதல் தொடர்பான விதிகள்:'
              : 'Our policies regarding cancellation and rescheduling are as follows:'}
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'அமர்வுக்கு 24 மணி நேரத்திற்கு முன்பு செய்யப்படும் ரத்து செய்தல்களுக்கு எந்தக் கட்டணமும் விதிக்கப்படாது.' 
                  : 'Cancellations or rescheduling requests made 24 hours prior to the scheduled session time will incur no charges.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'அமர்வு நேரத்திற்கு 24 மணி நேரத்திற்குள் செய்யப்படும் ரத்து செய்தல்களுக்கு ரத்துக் கட்டணம் வசூலிக்கப்படலாம்.' 
                  : 'Cancellations made within 24 hours of the appointment or no-shows may be subject to a cancellation fee.'}
              </div>
            </li>
            <li style={styles.listItem}>
              <div style={styles.bulletIcon}>•</div>
              <div>
                {isTamil 
                  ? 'முன்பணம் திரும்பப் பெறுதல் 5-7 வேலை நாட்களுக்குள் செயல்படுத்தப்படும்.' 
                  : 'Refunds for prepaid packages or advanced deposits will be processed within 5-7 business days.'}
              </div>
            </li>
          </ul>
        </div>

        {/* 4. Patient Responsibilities */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Scale size={22} />
            {isTamil ? '4. நோயாளிகளின் பொறுப்புகள்' : '4. Patient Responsibilities'}
          </h2>
          <p style={styles.text}>
            {isTamil ? (
              <>
                நோயாளிகள் தங்களின் துல்லியமான மருத்துவ வரலாறு, உடல் உபாதைகள் மற்றும் உடல்நலத் தகவல்களை ஆலோசனையின் போது வழங்குமாறு கேட்டுக் கொள்ளப்படுகிறார்கள். வெளிப்படுத்தப்படாத உடல்நலப் பிரச்சினைகளால் ஏற்படும் எந்தவொரு மருத்துவப் பக்கவிளைவுகளுக்கும் கிளினிக் நிர்வாகம் பொறுப்பேற்காது. சிறந்த முடிவுகளுக்கு, மருத்துவர் பரிந்துரைத்த உடற்பயிற்சி முறைகளைப் பின்பற்றுமாறு நோயாளிகள் கேட்டுக் கொள்ளப்படுகிறார்கள்.
              </>
            ) : (
              <>
                Patients are requested to provide accurate medical history, physical symptoms, and health information during consultations. The clinic management will not be responsible for any medical adverse events arising from undisclosed health conditions. Patients are also requested to follow the prescribed therapy routines and exercise guidelines for optimal results.
              </>
            )}
          </p>
        </div>

        {/* 5. Modifications to Service */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Activity size={22} />
            {isTamil ? '5. சேவைகளில் மாற்றங்கள்' : '5. Modifications to Service'}
          </h2>
          <p style={styles.text}>
            {isTamil ? (
              <>
                <span className="notranslate">தி தெரபி யூனிவர்ஸ்</span> எந்த நேரத்திலும் எந்தவொரு சிகிச்சையையும் அல்லது அமர்வுகளையும் முன்னறிவிப்புடன் அல்லது முன்னறிவிப்பு இன்றியும் தற்காலிகமாகவோ அல்லது நிரந்தரமாகவோ மாற்றுவதற்கும் நிறுத்துவதற்கும் உரிமை பெற்றுள்ளது.
              </>
            ) : (
              <>
                <span className="notranslate">THE THERAPY UNIVERSE</span> reserves the right to modify or discontinue, temporarily or permanently, any clinical treatments or rehabilitation packages with or without notice at any time.
              </>
            )}
          </p>
        </div>

        {/* 6. Contact Information */}
        <div style={{ ...styles.section, marginBottom: 0 }}>
          <h2 style={styles.sectionTitle}>
            <Mail size={22} />
            {isTamil ? '6. தொடர்பு விவரங்கள்' : '6. Contact Information'}
          </h2>
          <p style={styles.text}>
            {isTamil 
              ? 'விதிமுறைகள் குறித்து ஏதேனும் கேள்விகள் இருந்தால், எங்களை தொடர்பு கொள்ளவும்:'
              : 'If you have any queries regarding any of our terms, please contact us at:'}
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
