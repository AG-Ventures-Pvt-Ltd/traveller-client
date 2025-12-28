import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface TripFAQProps {
  faqs: FAQ[];
}

export function TripFAQ({ faqs }: TripFAQProps) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return (
      <div className="space-y-4 my-8">
        <h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
        <div className="text-gray-500 text-center py-8">
          FAQ details are not available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-8">
      <h2 className="font-bold text-2xl">Frequently Asked Questions</h2>
      <div>
        {faqs.map((faq, index) => (
          <Accordion 
            key={index}
            sx={{
              border: 'none',
              boxShadow: 'none',
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': {
                display: 'none',
              },
              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
