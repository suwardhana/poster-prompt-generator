import React from 'react';
import type { EventData } from '../../types';
import './EventForm.css';

interface EventFormProps {
  onDataChange: (data: EventData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onDataChange }) => {
  // Component implementation will be added in later tasks
  return (
    <div className="event-form">
      <h2>Event Form</h2>
      <p>Form implementation coming in task 3</p>
    </div>
  );
};

export default EventForm;