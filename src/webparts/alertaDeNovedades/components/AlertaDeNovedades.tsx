import * as React from 'react';
import styles from './AlertaDeNovedades.module.scss';
import { IAlertaDeNovedadesProps } from './IAlertaDeNovedadesProps';
import { escape } from '@microsoft/sp-lodash-subset';
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
}

export default class AlertaDeNovedades extends React.Component<IAlertaDeNovedadesProps, IAlertaDeNovedadesState> {

  constructor(props:IAlertaDeNovedadesProps){
    super(props);
    this.state = {
      positioningContainerProps:null,
      targetButton:null,
      teachingBubbleVisible:true
    }
  }
  public toggleTeachingBubbleVisible = () => {
    this.setState({
      teachingBubbleVisible:false
    })
  }
  public componentDidMount(){
    /* this.setState({
      positioningContainerProps: {directionalHint:DirectionalHint.rightBottomEdge, doNotLayer:false}
    }) */
  }
  public render(): React.ReactElement<IAlertaDeNovedadesProps> {
    console.log("opciones ", this.props.option )
    let teachingBubbleVisible = this.state.teachingBubbleVisible
    return (
      <div className={ styles.alertaDeNovedades } id="targetButton">
        {
          teachingBubbleVisible && (
          <Coachmark
          target="#targetButton"
          positioningContainerProps={{directionalHint:this.props.option}}
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
            {this.props.description}
          </TeachingBubbleContent>
        </Coachmark>
          )
        }
         
      </div>
    );
  }
}
