import * as React from "react";
import styles from "./AlertaDeNovedades.module.scss";
import { IAlertaDeNovedadesProps } from "./IAlertaDeNovedadesProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  Coachmark,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  TeachingBubbleContent,
  mergeStyleSets,
} from "@fluentui/react";
import { FunctionComponent, useState, useEffect } from "react";

const AlertaDeNovedades: FunctionComponent<IAlertaDeNovedadesProps> = (
  props
) => {
  console.log("al principio de la FN", props)
  const [description, setDescription] = useState<string>(props.description?props.description:"");
  const [teachingBubbleVisible, setTeachingBubbleVisible] = useState<boolean>(true);
  const [option, setOption] = useState<any>(props.option?props.option:0);
  const [date, setDate] = useState<Date>(null)

  useEffect(() => {
    console.log("Description: ", description, "Teaching: ", teachingBubbleVisible, "Option: ", option)
    setDescription(props.description);
    setOption(props.option);
    setTeachingBubbleVisible(true);

    return () => {
      console.log("en Return", props)
    };
  }, [props]);

  const toggleTeachingBubbleVisible = () => {
    setTeachingBubbleVisible(false);
  };

  return (
    <div className={styles.alertaDeNovedades} id="targetButton">
      {teachingBubbleVisible && (
        <Coachmark
          target="#targetButton"
          positioningContainerProps={{ directionalHint: option, doNotLayer:true }}
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
            onDismiss={toggleTeachingBubbleVisible}
          >
            {description}
          </TeachingBubbleContent>
        </Coachmark>
      )}
    </div>
  );
};

export default AlertaDeNovedades;
