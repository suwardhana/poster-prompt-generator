import React, { useState, useCallback } from 'react';
import type { EventData, PosterStyle, ValidationErrors } from '../../types';
import FormField from './FormField';
import './EventForm.css';

interface EventFormProps {
  onDataChange: (data: EventData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<EventData>({
    speakerName: '',
    eventDateTime: '',
    eventName: '',
    contactInfo: '',
    location: '',
    posterStyle: 'modern'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (field: keyof EventData, value: string): string | undefined => {
    switch (field) {
      case 'eventName':
        return value.trim() === '' ? 'Event name is required' : undefined;
      case 'eventDateTime':
        return value === '' ? 'Event date and time is required' : undefined;
      case 'contactInfo':
        if (value.trim() === '') return undefined; // Optional field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!emailRegex.test(value) && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid email address or phone number';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleFieldChange = useCallback((field: keyof EventData, value: string | PosterStyle) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    // Validate the field
    if (typeof value === 'string') {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
    
    onDataChange(updatedData);
  }, [formData, onDataChange]);

  return (
    <div className="event-form">
      <h2>Event Details</h2>
      <div className="form-grid">
        <FormField
          label="Speaker Name"
          value={formData.speakerName}
          onChange={(value) => handleFieldChange('speakerName', value)}
          type="text"
          placeholder="Enter speaker name"
          error={errors.speakerName}
          isValid={!errors.speakerName && formData.speakerName.trim() !== ''}
        />
        
        <FormField
          label="Event Date & Time"
          value={formData.eventDateTime}
          onChange={(value) => handleFieldChange('eventDateTime', value)}
          type="datetime-local"
          required
          error={errors.eventDateTime}
          isValid={!errors.eventDateTime && formData.eventDateTime !== ''}
        />
        
        <FormField
          label="Event Name"
          value={formData.eventName}
          onChange={(value) => handleFieldChange('eventName', value)}
          type="text"
          required
          placeholder="Enter event name"
          error={errors.eventName}
          isValid={!errors.eventName && formData.eventName.trim() !== ''}
        />
        
        <FormField
          label="Contact Information"
          value={formData.contactInfo}
          onChange={(value) => handleFieldChange('contactInfo', value)}
          type="text"
          placeholder="email@example.com or phone number"
          error={errors.contactInfo}
          isValid={!errors.contactInfo && formData.contactInfo.trim() !== ''}
        />
        
        <FormField
          label="Event Location"
          value={formData.location}
          onChange={(value) => handleFieldChange('location', value)}
          type="text"
          placeholder="Enter event location"
          error={errors.location}
          isValid={!errors.location && formData.location.trim() !== ''}
        />
        
        <div className="form-field">
          <label className="form-label">Poster Style</label>
          <select 
            className="form-select"
            value={formData.posterStyle}
            onChange={(e) => handleFieldChange('posterStyle', e.target.value as PosterStyle)}
          >
            <option value="modern">Modern</option>
            <option value="formal">Formal</option>
            <option value="playful">Playful</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventForm;