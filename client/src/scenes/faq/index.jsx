import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FAQDetails from "../../data/FAQDetails";

const FAQ = () => {
    const theme = useTheme();
    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Questions" />
            {FAQDetails.map((faq, index) => (
                <Accordion key={index} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={theme.palette.mode === "light" ? "#000000" : "#f6da54"} variant="h5">
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
  };

export default FAQ