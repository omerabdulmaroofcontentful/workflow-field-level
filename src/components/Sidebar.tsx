import React, { useEffect, useState } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph,Stack,Autocomplete } from '@contentful/f36-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  cma: PlainClientAPI;
}

function AutocompleteBasicUsageExample(sdk:any) {

  const [workflowStates, setworkflowStates] = useState(['']);
  const [currentState, setCurrentState] = useState(['']);
  const [auditLogs, setAuditLogs] = useState(['']);


  useEffect(()=>{
    console.log('useEffect',sdk)
    async function getInitialContentState() {
      let validationStates = await sdk.props.entry.fields["workflow"].validations
      let validationValues = validationStates[0]
      setworkflowStates(validationValues["in"])

      //get the value of the field
      let currentState = await sdk.props.entry.fields["workflow"].getValue()
      setCurrentState(currentState)

      console.log('state',workflowStates,currentState)
    }

     getInitialContentState()
  }, [])

  // We filter the "spaces" array by the inputValue
  // we use 'toLowerCase()' to make the search case insensitive
  const handleInputValueChange = async (value: any) => {
    // console.log('handleInputValueChange',value)

    // //current state
    // let previousState = currentState

    // //setting new value
    // let result = await sdk.props.entry.fields["workflow"].setValue(value)

    // if(result){
    //   setCurrentState(result)
    //   //write the log to the server
    //   let userEmail = sdk.props.user.email
    //   let auditLog = `New ${result}' Previous '${previousState} 'by' ${userEmail}`


    //   console.log(auditLog)
    //   setAuditLogs(currentAuditLogs => [...currentAuditLogs, auditLog])

    // }
  };

  // This function will be called once the user selects an item in the list of options
  const handleSelectItem = async (item: any) => {
    //setSelectedSpace(item);
        //current state
        let previousState = currentState

        //setting new value
        let result = await sdk.props.entry.fields["workflow"].setValue(item)
    
        if(result){
          setCurrentState(result)
          //write the log to the server
          let userEmail = sdk.props.user.email
          let auditLog = `New ${result}' Previous '${previousState} 'by' ${userEmail}`
    
          
          //send this to 3rd Party server 
          console.log(auditLog)
          setAuditLogs(currentAuditLogs => [...currentAuditLogs, auditLog])
    
        }
  };

  return (
    <Stack flexDirection="column" alignItems="start">
      <Autocomplete
        items={workflowStates}
        onInputValueChange={handleInputValueChange}
        onSelectItem={handleSelectItem}
      />

      <Paragraph>
        Current WorkflowState: <b>{currentState}</b>
      </Paragraph>

      <h3>Audit Logs</h3>
      <Paragraph>
        {auditLogs.map((log)=> <>{log} <br/><br/></> )}
      </Paragraph>
    </Stack>
  );
}

const Sidebar = (props: SidebarProps) => {

  return <>
   <AutocompleteBasicUsageExample props={props.sdk}/>
  </>
};

export default Sidebar;
