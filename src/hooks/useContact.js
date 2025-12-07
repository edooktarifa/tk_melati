import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const useContact = () => {
    const [contact, setContact] = useState({
        email: '',
        phoneNumber: '',
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "contact"));
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setContact({
                        email: docData.email || '',
                        phoneNumber: docData.phoneNumber || '',
                        loading: false,
                        error: null
                    });
                } else {
                    setContact(prev => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error("Error fetching contact: ", error);
                setContact(prev => ({
                    ...prev,
                    loading: false,
                    error: "Failed to load contact info"
                }));
            }
        };

        fetchContact();
    }, []);

    // Helper to format for WhatsApp URL (e.g., 0812... -> 62812...)
    const getWhatsAppNumber = () => {
        if (!contact.phoneNumber) return '';
        let cleaned = contact.phoneNumber.replace(/\D/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.substring(1);
        }
        return cleaned;
    };

    return { ...contact, getWhatsAppNumber };
};

export default useContact;
