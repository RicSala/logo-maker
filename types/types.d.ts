import { CompanyDescriptionSchema } from '@/components/presets/ia-preset';
import { Logo } from '@/providers/app/types';

export type HttpStatusCode = 200 | 201 | 400 | 401 | 404 | 500; // Extend as needed

export type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
};

//   Utility type: Make a specific property nullable
export type MakeNullable<T, K extends keyof T> = Omit<T, K> & // First we ommit the whole property
    Partial<Pick<T, K>>; // Then we add it as a partial property

export type ChildrenProps = {
    children: React.ReactNode;
};

export type AuthContextProps = {
    isLoggedIn: Boolean;
    user: any; // TODO: temporal
};

export type Post = {
    slug: string;
    title: string;
    published: boolean;
    tags: string[];
    date: string;
};

export type ApiResponse<T = undefined, E = ApiError> =
    | {
          statusCode: HttpStatusCode;
          message: string;
          data: T;
          ok: true;
          meta?: any; // Additional metadata
          pagination?: PaginationInfo;
      }
    | {
          statusCode: HttpStatusCode;
          message: string;
          ok: false;
          error: E;
          meta?: any; // Additional metadata
          data: T;
      };

export type ApiRequestBody<T = undefined> = {
    data: T;
    action: apiAction;
};

/**
 * Utility type: Make all the properties of an object nullable
 */
export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export type Preset = Nullable<Logo> & {
    description?: string;
    id: string;
    name: string;
};

/**
 * Utility type: Make the type "loose", meaning it can be the given type or any string
 */
export type Loose<T> = T | (string & {});

// Define a map of the actions and their corresponding request and response data types
type PresetsApiMap = {
    GENERATE: {
        reqData: GenereteFormValues;
        resData: string;
    };
};
