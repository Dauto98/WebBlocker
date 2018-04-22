## Web Blocker extension
This chrome extension redirect url request specified by the user to it own simple html page, use for reduce distraction by blocking some pages and urls

### Getting started
1. Clone this project
2. Make sure to turn on development mode for chrome [
(link)](https://developer.chrome.com/extensions/faq#faq-dev-01)
3. Use "load unpacked extension" and choose this project folder

### How does this work
There are 2 parts: blocking and passing
For each outbound request, the request url is check using regex to see whether there is any match saved in the "block" setting, if not, then the request go normally, otherwise, it is continue to be checked again "pass" url, if matched, then the request continue as normal, otherwise the tab will be redirect to this extension html page (only 7 words in the page :v)
The "pass" setting is used for specific url not to be blocked, usually sublink, subnav,.....

### How to use
- click + button to add url
- switch on/off to turn on/off for specific url
- click X to delete if you don't need it anymore
