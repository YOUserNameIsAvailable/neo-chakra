export type MenuItem = {
  children?: MenuItems
  soon?: boolean
  rootParentType?: ComponentType
}

type MenuItems = Partial<
  {
    [k in ComponentType]: MenuItem
  }
>

// export const menuItems: any = {
//   Accordion: {
//     children: {
//       Accordion: {},
//       AccordionItem: {},
//       AccordionButton: {},
//       AccordionPanel: {},
//       AccordionIcon: {},
//     },
//   },
//   Alert: {
//     children: {
//       Alert: {},
//       AlertDescription: {},
//       AlertIcon: {},
//       AlertTitle: {},
//     },
//   },
//   AspectRatio: {
//     children: {
//       AspectRatio: {},
//     },
//   },
//   //  AvatarGroup: {
//   //    rootParentType: 'Avatar',
//   //  },
//   Avatar: {
//     children: {
//       Avatar: {},
//       AvatarGroup: {},
//       AvatarBadge: {},
//     },
//   },
//   //  AvatarBadge: {
//   //    rootParentType: 'Avatar',
//   //  },
//   Badge: {
//     children: {
//       Badge: {},
//     },
//   },
//   Box: {
//     children: {
//       Box: {},
//     },
//   },
//   Breadcrumb: {
//     children: {
//       Breadcrumb: {},
//       BreadcrumbItem: {},
//       BreadcrumbLink: {},
//     },
//   },
//   Button: {
//     children: {
//       Button: {},
//     },
//   },
//   Center: {
//     children: {
//       Center: {},
//     },
//   },
//   Container: {
//     children: {
//       Container: {},
//     },
//   },
//   Checkbox: {
//     children: {
//       Checkbox: {},
//     },
//   },
//   CircularProgress: {
//     children: {
//       CircularProgress: {},
//     },
//   },
//   CloseButton: {
//     children: {
//       CloseButton: {},
//     },
//   },
//   Code: {
//     children: {
//       Code: {},
//     },
//   },
//   Divider: {
//     children: {
//       Divider: {},
//     },
//   },
//   Flex: {
//     children: {
//       Flex: {},
//     },
//   },
//   FormControl: {
//     children: {
//       FormControl: {},
//       FormLabel: {},
//       FormHelperText: {},
//       FormErrorMessage: {},
//     },
//   },
//   Grid: {
//     children: {
//       Grid: {},
//     },
//   },
//   Heading: {
//     children: {
//       Heading: {},
//     },
//   },
//   Highlight: {
//     children: {
//       Highlight: {},
//     },
//   },
//   Icon: {
//     children: {
//       Icon: {},
//     },
//   },
//   IconButton: {
//     children: {
//       IconButton: {},
//     },
//   },
//   Image: {
//     children: {
//       Image: {},
//     },
//   },
//   Input: {
//     children: {
//       InputGroup: {},
//       Input: {},
//       InputLeftAddon: {},
//       InputRightAddon: {},
//       InputRightElement: {},
//       InputLeftElement: {},
//     },
//   },
//   // InputGroup: {
//   //   rootParentType: 'Input',
//   //   children: {
//   //     InputGroup: {},
//   //     Input: {},
//   //     InputLeftAddon: {},
//   //     InputRightAddon: {},
//   //     InputRightElement: {},
//   //     InputLeftElement: {},
//   //   },
//   // },
//   Link: {
//     children: {
//       Link: {},
//     },
//   },
//   List: {
//     children: {
//       List: {},
//       ListItem: {},
//     },
//   },
//   Kbd: {
//     children: {
//       Kbd: {},
//     },
//   },
//   NumberInput: {
//     children: {
//       NumberInput: {},
//     },
//   },
//   Progress: {
//     children: {
//       Progress: {},
//     },
//   },
//   Radio: {
//     children: {
//       Radio: {},
//       RadioGroup: {},
//     },
//   },
//   // RadioGroup: {
//   //   rootParentType: 'Radio',
//   // },
//   SimpleGrid: {
//     children: {
//       SimpleGrid: {},
//     },
//   },
//   Spinner: {
//     children: {
//       Spinner: {},
//     },
//   },
//   Select: {
//     children: {
//       Select: {},
//     },
//   },
//   Skeleton: {
//     children: {
//       Skeleton: {},
//     },
//   },
//   SkeletonCircle: {
//     children: {
//       SkeletonCircle: {},
//     },
//   },
//   SkeletonText: {
//     children: {
//       SkeletonText: {},
//     },
//   },
//   Stack: {
//     children: {
//       Stack: {},
//     },
//   },
//   Stat: {
//     children: {
//       StatGroup: {},
//       Stat: {},
//       StatLabel: {},
//       StatNumber: {},
//       StatHelpText: {},
//       StatArrow: {},
//     },
//   },
//   Switch: {
//     children: {
//       Switch: {},
//     },
//   },
//   Tabs: {
//     children: {
//       Tabs: {},
//       Tab: {},
//       TabList: {},
//       TabPanel: {},
//       TabPanels: {},
//     },
//   },
//   Tag: {
//     children: {
//       Tag: {},
//     },
//   },
//   Text: {
//     children: {
//       Text: {},
//     },
//   },
//   Textarea: {
//     children: {
//       Textarea: {},
//     },
//   },
//   Menu: { soon: true },
// }

export const menuItems: any = {
  Accordion: {
    children: {
      Accordion: {},
      AccordionItem: {},
      AccordionButton: {},
      AccordionPanel: {},
      AccordionIcon: {},
    },
  },
  Alert: {
    children: {
      Alert: {},
      AlertDescription: {},
      AlertIcon: {},
      AlertTitle: {},
    },
  },
  AspectRatio: {},
  AvatarGroup: {
    rootParentType: 'Avatar',
  },
  Avatar: {},
  AvatarBadge: {
    rootParentType: 'Avatar',
  },
  Badge: {},
  Box: {},
  Breadcrumb: {
    children: {
      BreadcrumbItem: {},
      BreadcrumbLink: {},
    },
  },
  Button: {},
  Center: {},
  Container: {},
  Checkbox: {},
  CircularProgress: {},
  CloseButton: {},
  Code: {},
  Divider: {},
  Flex: {},
  FormControl: {
    children: {
      FormControl: {},
      FormLabel: {},
      FormHelperText: {},
      FormErrorMessage: {},
    },
  },
  Grid: {},
  Heading: {},
  Highlight: {},
  Icon: {},
  IconButton: {},
  Image: {},
  Input: {},
  InputGroup: {
    rootParentType: 'Input',
    children: {
      InputGroup: {},
      Input: {},
      InputLeftAddon: {},
      InputRightAddon: {},
      InputRightElement: {},
      InputLeftElement: {},
    },
  },
  Link: {},
  List: {
    children: {
      List: {},
      ListItem: {},
    },
  },
  Kbd: {},
  NumberInput: {},
  Progress: {},
  Radio: {},
  RadioGroup: {
    rootParentType: 'Radio',
  },
  SimpleGrid: {},
  Spinner: {},
  Select: {},
  Skeleton: {},
  SkeletonCircle: {},
  SkeletonText: {},
  Stack: {},
  Stat: {
    children: {
      StatGroup: {},
      Stat: {},
      StatLabel: {},
      StatNumber: {},
      StatHelpText: {},
      StatArrow: {},
    },
  },
  Switch: {},
  Tabs: {
    children: {
      Tabs: {},
      Tab: {},
      TabList: {},
      TabPanel: {},
      TabPanels: {},
    },
  },
  Tag: {},
  Text: {},
  Textarea: {},
  Menu: { soon: true },
}

export const proComponentItems: any = {
  PageHeader: {},
  WeatherForecast: {},
  CurrencyConverter: {},
}
export const applicationItems: any = {
  Banner: {},
}
export const ecommerceItems: any = {
  CategoryShowcase: {},
  StorePopups: {},
}
export const marketingItems: any = {
  CallToAction: {},
}

export const componentsList: any = [
  'Accordion',
  'AccordionIcon',
  'AccordionItem',
  'AccordionPanel',
  'Alert',
  'AlertDescription',
  'AlertIcon',
  'AlertTitle',
  'AspectRatio',
  'Avatar',
  'AvatarBadge',
  'AvatarGroup',
  'Badge',
  'Box',
  'Breadcrumb',
  'BreadcrumbItem',
  'BreadcrumbLink',
  'Button',
  'Center',
  'Checkbox',
  'CircularProgress',
  'CloseButton',
  'Code',
  'Container',
  'Divider',
  'Editable',
  'Flex',
  'CategoryShowcase',
  'PageHeader',
  'WeatherForecast',
  'CurrencyConverter',
  'CallToAction',
  'StorePopups',
  'FormControl',
  'FormErrorMessage',
  'FormHelperText',
  'FormLabel',
  'Grid',
  'Heading',
  'Highlight',
  'Icon',
  'IconButton',
  'Image',
  'Input',
  'InputGroup',
  'InputLeftAddon',
  'InputLeftElement',
  'InputRightAddon',
  'InputRightElement',
  'Kbd',
  'Link',
  'List',
  'ListIcon',
  'ListItem',
  'Menu',
  'NumberInput',
  'Progress',
  'Radio',
  'RadioGroup',
  'Select',
  'SimpleGrid',
  'Spinner',
  'Skeleton',
  'SkeletonCircle',
  'SkeletonText',
  'Stack',
  'Stat',
  'StatArrow',
  'StatGroup',
  'StatHelpText',
  'StatLabel',
  'StatNumber',
  'Switch',
  'Tab',
  'TabList',
  'TabPanel',
  'TabPanels',
  'Tabs',
  'Tag',
  'Text',
  'Textarea',
]
