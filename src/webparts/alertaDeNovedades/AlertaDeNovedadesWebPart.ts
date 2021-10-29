import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  DirectionalHint, TooltipHost,
  
} from '@fluentui/react';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AlertaDeNovedadesWebPartStrings';
import AlertaDeNovedades from './components/AlertaDeNovedades';
import { IAlertaDeNovedadesProps } from './components/IAlertaDeNovedadesProps';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention,IDateTimeFieldValue  } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';

export interface IAlertaDeNovedadesWebPartProps {
  description: string;
  option: any
  context: WebPartContext,
  datetime: IDateTimeFieldValue;
}

export default class AlertaDeNovedadesWebPart extends BaseClientSideWebPart<IAlertaDeNovedadesWebPartProps> {

  public render(): void {

    console.log("paso props", this.properties.option)
    const element: React.ReactElement<IAlertaDeNovedadesProps> = React.createElement(
      AlertaDeNovedades,
      {
        description: this.properties.description?this.properties.description:"",
        option: this.properties.option?this.properties.option:0,
        context: this.context,
        date:this.properties.datetime?this.properties.datetime.value:null
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
  
  protected get disableReactivePropertyChanges(): boolean {
    return true;
    }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  multiline:true
                }),
                PropertyPaneDropdown('option', {
                  label:"Seleccione una opción",
                  selectedKey:0,
                  options:[{ text: 'Borde superior izquierdo', key: DirectionalHint.topLeftEdge },
                  { text: 'Arriba centrado', key: DirectionalHint.topCenter },
                  { text: 'Borde superior derecho', key: DirectionalHint.topRightEdge },
                  { text: 'Borde inferior izquierdo', key: DirectionalHint.bottomLeftEdge },
                  { text: 'Abajo centrado', key: DirectionalHint.bottomCenter },
                  { text: 'Borde inferior derecho', key: DirectionalHint.bottomRightEdge }]
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Mostrar hasta (no incluye el dia seleccionado)',
                  initialDate: this.properties.datetime,
                  dateConvention: DateConvention.Date,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId',
                  showLabels: false
                })
              ]
            }
          ]
        }
      ]
    };
    
  }
  
}