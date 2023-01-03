import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Home from "../Home"
import Products from "../Products"

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [errorStepNumber, setErrorStepNumber] = useState(0)

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const isStepFailed = (step) => {
        return step === errorStepNumber;
    };

    const renderStepPage = () => {
        switch (activeStep + 1) {
            case 1:
                return (<Home />)
            case 2:
                return (<Products />)
            case 3:
                return (<div className='bg-success'><h1>RadheRadhe</h1></div>)
            default:
                break;
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Invalid Enteries
                            </Typography>
                        );
                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}

            </Stepper>

            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                            Step {activeStep + 1}
                        </Typography>
                        {renderStepPage()}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';

// const steps = [
//     {
//         label: 'Select campaign settings',
//         description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//     },
//     {
//         label: 'Create an ad group',
//         description:
//             'An ad group contains one or more ads which target a shared set of keywords.',
//     },
//     {
//         label: 'Create an ad',
//         description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//     },
// ];

// export default function VerticalLinearStepper() {
//     const [activeStep, setActiveStep] = React.useState(0);

//     const handleNext = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleReset = () => {
//         setActiveStep(0);
//     };

//     return (
//         <Box sx={{ maxWidth: 400 }}>
//             <Stepper activeStep={activeStep} orientation="vertical">
//                 {steps.map((step, index) => (
//                     <Step key={step.label}>
//                         <StepLabel
//                             optional={
//                                 index === 2 ? (
//                                     <Typography variant="caption">Last step</Typography>
//                                 ) : null
//                             }
//                         >
//                             {step.label}
//                         </StepLabel>
//                         <StepContent>
//                             <Typography>{step.description}</Typography>
//                             <Box sx={{ mb: 2 }}>
//                                 <div>
//                                     <Button
//                                         variant="contained"
//                                         onClick={handleNext}
//                                         sx={{ mt: 1, mr: 1 }}
//                                     >
//                                         {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                                     </Button>
//                                     <Button
//                                         disabled={index === 0}
//                                         onClick={handleBack}
//                                         sx={{ mt: 1, mr: 1 }}
//                                     >
//                                         Back
//                                     </Button>
//                                 </div>
//                             </Box>
//                         </StepContent>
//                     </Step>
//                 ))}
//             </Stepper>
//             {activeStep === steps.length && (
//                 <Paper square elevation={0} sx={{ p: 3 }}>
//                     <Typography>All steps completed - you&apos;re finished</Typography>
//                     <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//                         Reset
//                     </Button>
//                 </Paper>
//             )}
//         </Box>
//     );
// }