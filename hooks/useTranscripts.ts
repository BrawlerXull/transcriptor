'use client';

import { useState, useEffect } from 'react';

interface Transcript {
  id: number;
  text: string;
  created_at: string;
}

export function useTranscripts() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/transcripts');
        if (!response.ok) {
          throw new Error('Failed to fetch transcripts');
        }
        const data = await response.json();
        setTranscripts(data);
      } catch (error) {
        console.error('Error fetching transcripts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscripts();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return { transcripts, isLoading, expandedId, toggleExpand };
}
