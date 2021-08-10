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
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AlertaDeNovedadesWebPartStrings';
import AlertaDeNovedades from './components/AlertaDeNovedades';
import { IAlertaDeNovedadesProps } from './components/IAlertaDeNovedadesProps';

export interface IAlertaDeNovedadesWebPartProps {
  description: string;
  option: any
  context: WebPartContext
}

export default class AlertaDeNovedadesWebPart extends BaseClientSideWebPart<IAlertaDeNovedadesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAlertaDeNovedadesProps> = React.createElement(
      AlertaDeNovedades,
      {
        description: this.properties.description,
        option: this.properties.option,
        context: this.context
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
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('option', {
                  label:"Seleccione una opción",
                  options:[{ text: 'Top left edge', key: DirectionalHint.topLeftEdge },
                  { text: 'Top center', key: DirectionalHint.topCenter },
                  { text: 'Top right edge', key: DirectionalHint.topRightEdge },
                  { text: 'Top auto edge', key: DirectionalHint.topAutoEdge },
                  { text: 'Bottom left edge', key: DirectionalHint.bottomLeftEdge },
                  { text: 'Bottom center', key: DirectionalHint.bottomCenter },
                  { text: 'Bottom right edge', key: DirectionalHint.bottomRightEdge },
                  { text: 'Bottom auto edge', key: DirectionalHint.bottomAutoEdge },
                  { text: 'Left top edge', key: DirectionalHint.leftTopEdge },
                  { text: 'Left center', key: DirectionalHint.leftCenter },
                  { text: 'Left bottom edge', key: DirectionalHint.leftBottomEdge },
                  { text: 'Right top edge', key: DirectionalHint.rightTopEdge },
                  { text: 'Right center', key: DirectionalHint.rightCenter },
                  { text: 'Right bottom edge', key: DirectionalHint.rightBottomEdge },]
                })
              ]
            }
          ]
        }
      ]
    };
    
  }
  
}
