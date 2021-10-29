import * as React from 'react';
import styles from './AlertaDeNovedades.module.scss';
import { IAlertaDeNovedadesProps } from './IAlertaDeNovedadesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as moment from 'moment';

import {
  Coachmark,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  TeachingBubbleContent,
  mergeStyleSets,
} from '@fluentui/react';

export interface IAlertaDeNovedadesState  {
  positioningContainerProps : {
    directionalHint: DirectionalHint;
    doNotLayer: boolean;
  },
  targetButton: HTMLDivElement;
  teachingBubbleVisible: boolean;
  description:string;
  spinner:boolean;
}


export default class AlertaDeNovedades extends React.Component<IAlertaDeNovedadesProps, IAlertaDeNovedadesState> {

  constructor(props:IAlertaDeNovedadesProps){
    super(props);
    this.state = {
      positioningContainerProps:null,
      targetButton:null,
      teachingBubbleVisible:true,
      description:"",
      spinner:false
    }
  }
  public toggleTeachingBubbleVisible = () => {
    this.setState({
      teachingBubbleVisible:false
    })
  }
  public componentDidMount(){
    let inRange= this.validateDate(this.props.date?this.props.date:null)
     this.setState({
      positioningContainerProps: {directionalHint:this.props.option, doNotLayer:false},
      description: this.props.description?this.props.description:"",
      teachingBubbleVisible: inRange
    }) 
  }

  public componentDidUpdate(prevProps, prevState){
    
    if(prevProps != this.props){
      this.setState({spinner:true})
      setTimeout(this.updateState,30,this.props)
      
    }
  }
  public validateDate = (date:Date):boolean => {
    let res = moment().isBefore(date);
    return res
  }
  public updateState = (props)=>{

    let isValidDate= this.validateDate(props.date)
    this.setState({
      positioningContainerProps: {directionalHint:props.option, doNotLayer:false}, 
      description: props.description,
      teachingBubbleVisible:isValidDate,
      spinner:false
    })
  }
  public render(): React.ReactElement<IAlertaDeNovedadesProps> {
    console.log("opciones ", this.state )
    let teachingBubbleVisible = this.state.teachingBubbleVisible
    return (
      <div className={ styles.alertaDeNovedades } id="targetButton">
        {
         this.state.spinner?
         <Spinner size={SpinnerSize.xSmall} ></Spinner>
         : teachingBubbleVisible && (
          <Coachmark
          target="#targetButton"
          positioningContainerProps={this.state.positioningContainerProps}
          ariaAlertText="A coachmark has appeared"
          ariaDescribedBy="coachmark-desc1"
          ariaLabelledBy="coachmark-label1"
          ariaDescribedByText="Press enter or alt + C to open the coachmark notification"
          ariaLabelledByText="Coachmark notification"
        >
          <TeachingBubbleContent
            headline="Novedad"
            hasCloseButton
            closeButtonAriaLabel="Close"
            ariaDescribedBy="example-description1"
            ariaLabelledBy="example-label1"
            onDismiss={this.toggleTeachingBubbleVisible}
          >
            {this.state.description}
          </TeachingBubbleContent>
        </Coachmark>
         )
        }
         
      </div>
    );
  }
}
