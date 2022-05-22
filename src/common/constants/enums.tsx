export enum PasswordStrengthStatus {
  TOO_WEAK = 'Too weak',
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

export enum RowDirection {
  ROW = 'row',
  COLUMN = 'column',
}

export enum AccountSettingsChangeMode {
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
}

export enum HttpMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum TaskDateType {
  Today = 'Today',
  PAST = 'PAST',
  NONE = 'NONE',
}

export enum ProjectSettingsOption {
  SHOW_COMPLETED = 'SHOW_COMPLETED',
}

export enum Sounds {
  NOTIFICATION,
}

export enum TimelineView {
  DEFAULT = 'DEFAULT',
  LIST = 'LIST',
}

export enum DefaultHomePage {
  TODAY = 'today',
  INBOX = 'inbox',
  TIMELINE = 'timeline'
}
