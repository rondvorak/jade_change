//
//  LocalNotification.h
//	Phonegap LocalNotification Plugin
//	Copyright (c) Greg Allen 2011 & 2012 Drew Dahlman
//	MIT Licensed

#import <Foundation/Foundation.h>

/* FOR PHONEGAP 2.0.* */

#import <Cordova/CDVPlugin.h>


/* 
UNCOMMENT FOR CORDOVA

#ifdef CORDOVA_FRAMEWORK
#import <Cordova/CDVPlugin.h>
#else
#import "CDVPlugin.h"
#endif

*/
@interface LocalNotification : CDVPlugin {
    
}
- (void)addNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)cancelNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)cancelAllNotifications:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
