import { Logo } from './app-provider';

export type LogoAction =
    | {
          type: 'SET_LOGO_ICON';
          value: Logo['icon'];
      }
    | {
          type: 'SET_ICON_SIZE';
          value: Logo['size'];
      }
    | {
          type: 'SET_ICON_ROTATION';
          value: Logo['rotation'];
      }
    | {
          type: 'SET_STROKE_WIDTH';
          value: Logo['strokeWidth'];
      }
    | {
          type: 'SET_STROKE_COLOR';
          value: Logo['strokeColor'];
      }
    | {
          type: 'SET_FILL_COLOR';
          value: Logo['fillColor'];
      }
    | {
          type: 'SET_IS_FILLED';
          value: Logo['isFilled'];
      }
    | {
          type: 'SET_BORDER_RADIUS';
          value: Logo['borderRadius'];
      }
    | {
          type: 'SET_BACKGROUND_COLOR';
          value: Logo['backgroundColor'];
      }
    | {
          type: 'SET_SHADOW';
          value: Logo['shadow'];
      }
    | {
          type: 'IS_GRADIENT_BACKGROUND';
          value: Logo['isGradientBackground'];
      }
    | {
          type: 'SET_COMPLETE_LOGO';
          value: Logo;
      };

export const reducer = (logo: Logo, action: LogoAction) => {
    switch (action.type) {
        case 'SET_LOGO_ICON':
            return {
                ...logo,
                icon: action.value,
            };

        case 'SET_ICON_SIZE':
            return {
                ...logo,
                size: action.value,
            };

        case 'SET_ICON_ROTATION':
            return {
                ...logo,
                rotation: action.value,
            };

        case 'SET_STROKE_WIDTH':
            return {
                ...logo,
                strokeWidth: action.value,
            };

        case 'SET_STROKE_COLOR':
            return {
                ...logo,
                strokeColor: action.value,
            };

        case 'SET_FILL_COLOR':
            return {
                ...logo,
                fillColor: action.value,
            };

        case 'SET_IS_FILLED':
            return {
                ...logo,
                isFilled: action.value,
            };

        case 'SET_BORDER_RADIUS':
            return {
                ...logo,
                borderRadius: action.value,
            };

        case 'SET_BACKGROUND_COLOR':
            return {
                ...logo,
                backgroundColor: action.value,
            };

        case 'SET_SHADOW':
            return {
                ...logo,
                shadow: action.value,
            };

        case 'IS_GRADIENT_BACKGROUND':
            return {
                ...logo,
                isGradientBackground: action.value,
            };
        case 'SET_COMPLETE_LOGO':
            return {
                ...action.value,
            };

        default:
            throw new Error();
    }
};
