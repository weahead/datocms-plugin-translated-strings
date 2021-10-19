type Account = {
  attributes: {
    company: string
    email: string
    first_name: string
    last_name: string
  }
  id: string
  type: string
}

type Appearance = {
  addons: Array<any>
  editor: string
  parameters: Instance
}

type Field = {
  attributes: {
    api_key: string
    appearance: Appearance
    appeareance: Appearance
    defaultValue?: string
    field_type: string
    hint?: string
    label: string
    localized: boolean
    position: number
    validators: Record<string, any>
  }
  id: string
  relationships: Relationships
  type: string
}

type Instance = Record<string, string | boolean | number>

type ItemType = {
  attributes: {
    all_locales_required: boolean
    api_key: string
    collection_appearance: string
    collection_appeareance: string
    draft_mode_active: boolean
    has_singleton_item: boolean
    hint?: string
    modular_block: boolean
    name: string
    ordering_direction?: string
    ordering_meta?: string
    singleton: boolean
    sortable: boolean
    tree: boolean
  }
  id: string
  relationships: Relationships
  type: string
}

type ItemValue = {
  internalLocales: Array<string>
  translated_strings: any
}

type Parameters = {
  global: {
    developmentMode: boolean
  }
  instance: Instance
}

type Relationships = {
  fieldset: {
    data?: Record<string, any>
  }
  item_type: {
    data: {
      id: string
      type: string
    }
  }
}

type Site = {
  attributes: {
    domain?: string
    favicon?: string
    frontend_url?: string
    global_seo: Record<string, string | null>
    google_maps_api_token: string
    imgix_host: string
    internal_domain: string
    ip_tracking_enabled: boolean
    last_data_change_at: string
    locales: Array<string>
    name: string
    no_index: boolean
    require_2fa: boolean
    theme: Theme<ThemeColorRecord>
    timezone: string
  }
  id: string
  relationships: any
  type: string
}

type ThemeColorRecord = {
  alpha: number
  blue: number
  green: number
  red: number
}

type Theme<T> = {
  accent_color: T
  dark_color: T
  light_color: T
  logo?: any
  primary_color: T
  semiTransparentAccentColor?: T
}

export type DatoCMSPlugin = {
  addChangeListener: (field: string, cb: () => void) => () => void
  addFieldChangeListener: (field: string, cb: () => void) => () => void
  alert: (message: string) => void
  createNewItem: (itemTypeId: number) => Promise<{}>
  disableField: (field: string, disable: boolean) => Promise<{}>
  editItem: (itemId: number) => Promise<{}>
  editUpload: (uploadId: number) => Promise<{}>
  editUploadMetadata: (metadata: Record<string, string | number | boolean>) => Promise<{}>
  getFieldValue: (field: string, locale?: string) => string | undefined
  loadItemTypeFields: (itemTypeId: number) => void
  notice: (message: string) => void
  scrollToField: (field: string, locale?: string) => void
  saveCurrentItem: () => Promise<{}>
  selectItem: (itemTypeId: number, options?: Record<string, string | boolean | number>) => Promise<{}>
  selectUpload: (options?: Record<string, string | boolean | number>) => Promise<{}>
  setFieldValue: (field: string, newValue: any) => Promise<{}>
  startAutoResizer: () => void
  stopAutoResizer: () => void
  toggleField: (field: string, visible: boolean) => Promise<{}>
  updateHeight: (height?: number) => void

  account: Account
  currentUser: Account
  disabled: boolean
  environment?: string
  field: Field
  fieldId: string
  fieldPath: string
  fields: Record<string, Field>
  isSubmitting: boolean
  itemId: string
  itemStatus: string
  itemType: ItemType
  itemTypes: Record<string, ItemType>
  itemValue: ItemValue
  locale: string
  parameters: Parameters
  parentFieldId?: string
  placeholder: string
  site: Site
  theme: Theme<string>
  users: Record<string, any>
}
