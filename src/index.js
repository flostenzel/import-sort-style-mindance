function isResourceModule(imported) {
  const { moduleName } = imported;
  return (
    moduleName.endsWith('.png') ||
    moduleName.endsWith('.svg') ||
    moduleName.endsWith('.jpg') ||
    moduleName.endsWith('.jpeg')
  );
}

function isCustomTypeModule(imported) {
  return imported.moduleName.endsWith('/types')
}

function isConstantModule(imported) {
  return imported.moduleName.endsWith('/constants/base')
}

function isAnalyticsModule(imported) {
  return imported.moduleName.endsWith('/constants/analytics')
}

function isStyleModule(imported) {
  return imported.moduleName.includes('/styles/')
}

function isComponentsModule(imported) {
  return imported.moduleName.includes('/components/')
}

function isInternalModule(imported) {
  return imported.moduleName.startsWith('./');
}

function isExternalModule(imported) {
  return imported.moduleName.startsWith('../');
}

function isReactNativeModule(imported) {
  return (
    imported.moduleName === 'react-native' ||
    imported.moduleName.startsWith('react-native/')
  );
}

function isReactModule(imported) {
  return imported.moduleName === 'react';
}


function style(api, file) {
  const {
    alias,
    and,
    not,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isInstalledModule,
    isNodeModule,
    isRelativeModule,
    moduleName,
    naturally,
    unicode,
  } = api;
  return [
    // import 'foo'
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import './foo'
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import React from 'react'
    // import { View, ... } from 'react-native'
    // import type { ViewStyleProp, ... } from 'react-native/**'
    { match: isReactModule, sortNamedMembers: alias(unicode) },
    { match: isReactNativeModule, sortNamedMembers: alias(unicode) },
    { separator: true },

    // import ... from 'fs' (Node modules)
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from 'foo'
    {
      match: isInstalledModule(file),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import ... from '../projectFoo' (non-resource)
    // import ... from './projectFoo' (non-resource)
    {
      match: and(isExternalModule, not(isResourceModule), not(isCustomTypeModule), not(isConstantModule), not(isComponentsModule), not(isAnalyticsModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      match: and(isInternalModule, not(isResourceModule), not(isCustomTypeModule), not(isConstantModule), not(isComponentsModule), not(isAnalyticsModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import MD_BUTTON from '../components/base/MD_BUTTON' ;

    {
      match: and(isComponentsModule, not(isResourceModule), not(isCustomTypeModule), not(isConstantModule), not(isAnalyticsModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import shadow from '../styles/base' ;
    // import MD_GREEN from '../constants/base' ;
    // import ANALYTICS_EVENTS from '../analytics/base' ;
    // import type SESSION from '../types';
    // import image from '**/foo.png'
    { separator: true },
    {
      match: and(isStyleModule, not(isResourceModule), not(isCustomTypeModule), not(isAnalyticsModule), not(isConstantModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      match: and(isConstantModule, not(isResourceModule), not(isCustomTypeModule), not(isAnalyticsModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      match: and(isAnalyticsModule, not(isResourceModule), not(isCustomTypeModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      match: and(isCustomTypeModule, not(isResourceModule)),
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    {
      match: isResourceModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
  ];
}

module.exports = style;
