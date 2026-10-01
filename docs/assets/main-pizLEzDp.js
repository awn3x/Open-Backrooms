(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`attached`,t=1e3,n=1001,r=1002,i=1003,a=1004,o=1005,s=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,ee=1029,k=1030,te=1031,A=1033,ne=33776,j=33777,M=33778,N=33779,re=35840,ie=35841,ae=35842,oe=35843,se=36196,ce=37492,le=37496,P=37488,ue=37489,de=37490,fe=37491,pe=37808,me=37809,he=37810,ge=37811,_e=37812,ve=37813,ye=37814,be=37815,xe=37816,Se=37817,Ce=37818,we=37819,Te=37820,Ee=37821,De=36492,Oe=36494,ke=36495,Ae=36283,je=36284,Me=36285,Ne=36286,F=2200,Pe=2201,Fe=2202,Ie=2300,I=2301,Le=2302,L=2303,R=2400,Re=2401,ze=2402,Be=2500,Ve=2501,He=3200,Ue=`srgb`,We=`srgb-linear`,Ge=`linear`,Ke=`srgb`,qe=7680,Je=35044,Ye=2e3;function Xe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ze(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Qe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function $e(){let e=Qe(`canvas`);return e.style.display=`block`,e}var et={};function tt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function nt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=nt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rt(...e){let t=e.join(` `);t in et||(et[t]=!0,z(...e))}function it(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var at={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},ot=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},st=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ct=1234567,lt=Math.PI/180,ut=180/Math.PI;function dt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(st[e&255]+st[e>>8&255]+st[e>>16&255]+st[e>>24&255]+`-`+st[t&255]+st[t>>8&255]+`-`+st[t>>16&15|64]+st[t>>24&255]+`-`+st[n&63|128]+st[n>>8&255]+`-`+st[n>>16&255]+st[n>>24&255]+st[r&255]+st[r>>8&255]+st[r>>16&255]+st[r>>24&255]).toLowerCase()}function ft(e,t,n){return Math.max(t,Math.min(n,e))}function pt(e,t){return(e%t+t)%t}function mt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ht(e,t,n){return e===t?0:(n-e)/(t-e)}function gt(e,t,n){return(1-n)*e+n*t}function _t(e,t,n,r){return gt(e,t,1-Math.exp(-n*r))}function vt(e,t=1){return t-Math.abs(pt(e,t*2)-t)}function yt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function bt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function xt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function St(e,t){return e+Math.random()*(t-e)}function Ct(e){return e*(.5-Math.random())}function wt(e){e!==void 0&&(ct=e);let t=ct+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Tt(e){return e*lt}function Et(e){return e*ut}function Dt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Ot(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function kt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function At(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function jt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Mt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Nt={DEG2RAD:lt,RAD2DEG:ut,generateUUID:dt,clamp:ft,euclideanModulo:pt,mapLinear:mt,inverseLerp:ht,lerp:gt,damp:_t,pingpong:vt,smoothstep:yt,smootherstep:bt,randInt:xt,randFloat:St,randFloatSpread:Ct,seededRandom:wt,degToRad:Tt,radToDeg:Et,isPowerOfTwo:Dt,ceilPowerOfTwo:Ot,floorPowerOfTwo:kt,setQuaternionFromProperEuler:At,normalize:Mt,denormalize:jt},V=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Pt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(It.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(It.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ft.copy(this).projectOnVector(e),this.sub(Ft)}reflect(e){return this.sub(Ft.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ft=new H,It=new Pt,U=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return rt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Lt.makeScale(e,t)),this}rotate(e){return rt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Lt.makeRotation(-e)),this}translate(e,t){return rt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Lt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Lt=new U,Rt=new U().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zt=new U().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bt(){let e={enabled:!0,workingColorSpace:We,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Ht(e.r),e.g=Ht(e.g),e.b=Ht(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ut(e.r),e.g=Ut(e.g),e.b=Ut(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ge:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return rt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return rt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[We]:{primaries:t,whitePoint:r,transfer:Ge,toXYZ:Rt,fromXYZ:zt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:t,whitePoint:r,transfer:Ke,toXYZ:Rt,fromXYZ:zt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}}),e}var Vt=Bt();function Ht(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ut(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Wt,Gt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wt===void 0&&(Wt=Qe(`canvas`)),Wt.width=e.width,Wt.height=e.height;let t=Wt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Wt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Qe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ht(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ht(t[e]/255)*255):t[e]=Ht(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Kt=0,qt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Kt++}),this.uuid=dt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Jt(r[t].image)):e.push(Jt(r[t]))}else e=Jt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Jt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Gt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Yt=0,Xt=new H,Zt=class e extends ot{constructor(t=e.DEFAULT_IMAGE,r=e.DEFAULT_MAPPING,i=n,a=n,o=s,c=l,d=T,f=u,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yt++}),this.uuid=dt(),this.name=``,this.source=new qt(t),this.mipmaps=[],this.mapping=r,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new V(0,0),this.repeat=new V(1,1),this.center=new V(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Xt).x}get height(){return this.source.getSize(Xt).y}get depth(){return this.source.getSize(Xt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case t:e.x-=Math.floor(e.x);break;case n:e.x=e.x<0?0:1;break;case r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case t:e.y-=Math.floor(e.y);break;case n:e.y=e.y<0?0:1;break;case r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null,Zt.DEFAULT_MAPPING=300,Zt.DEFAULT_ANISOTROPY=1;var Qt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$t=class extends ot{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:s,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Qt(0,0,e,t),this.scissorTest=!1,this.viewport=new Qt(0,0,e,t),this.textures=[];let r=new Zt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:s,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new qt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},en=class extends $t{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},tn=class extends Zt{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},nn=class extends Zt{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},W=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/rn.setFromMatrixColumn(e,0).length(),i=1/rn.setFromMatrixColumn(e,1).length(),a=1/rn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(on,e,sn)}lookAt(e,t,n){let r=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),cn.crossVectors(n,un),cn.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),cn.crossVectors(n,un)),cn.normalize(),ln.crossVectors(un,cn),r[0]=cn.x,r[4]=ln.x,r[8]=un.x,r[1]=cn.y,r[5]=ln.y,r[9]=un.y,r[2]=cn.z,r[6]=ln.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],k=r[6],te=r[10],A=r[14],ne=r[3],j=r[7],M=r[11],N=r[15];return i[0]=a*x+o*T+s*ee+c*ne,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*te+c*M,i[12]=a*w+o*O+s*A+c*N,i[1]=l*x+u*T+d*ee+f*ne,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*te+f*M,i[13]=l*w+u*O+d*A+f*N,i[2]=p*x+m*T+h*ee+g*ne,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*te+g*M,i[14]=p*w+m*O+h*A+g*N,i[3]=_*x+v*T+y*ee+b*ne,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*te+b*M,i[15]=_*w+v*O+y*A+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/ee;return e[0]=(o*O-s*D+c*E)*k,e[1]=(r*D-n*O-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*O-c*w)*k,e[5]=(t*O-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=rn.set(r[0],r[1],r[2]).length(),o=rn.set(r[4],r[5],r[6]).length(),s=rn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),an.copy(this);let c=1/a,l=1/o,u=1/s;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=l,an.elements[5]*=l,an.elements[6]*=l,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ye,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},rn=new H,an=new W,on=new H(0,0,0),sn=new H(1,1,1),cn=new H,ln=new H,un=new H,dn=new W,fn=new Pt,pn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ft(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ft(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fn.setFromEuler(this),this.setFromQuaternion(fn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pn.DEFAULT_ORDER=`XYZ`;var mn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},hn=0,gn=new H,_n=new Pt,vn=new W,yn=new H,bn=new H,xn=new H,Sn=new Pt,Cn=new H(1,0,0),wn=new H(0,1,0),Tn=new H(0,0,1),En={type:`added`},Dn={type:`removed`},On={type:`childadded`,child:null},kn={type:`childremoved`,child:null},An=class e extends ot{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hn++}),this.uuid=dt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new pn,r=new Pt,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new W},normalMatrix:{value:new U}}),this.matrix=new W,this.matrixWorld=new W,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.multiply(_n),this}rotateOnWorldAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.premultiply(_n),this}rotateX(e){return this.rotateOnAxis(Cn,e)}rotateY(e){return this.rotateOnAxis(wn,e)}rotateZ(e){return this.rotateOnAxis(Tn,e)}translateOnAxis(e,t){return gn.copy(e).applyQuaternion(this.quaternion),this.position.add(gn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cn,e)}translateY(e){return this.translateOnAxis(wn,e)}translateZ(e){return this.translateOnAxis(Tn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yn.copy(e):yn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),bn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(bn,yn,this.up):vn.lookAt(yn,bn,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),_n.setFromRotationMatrix(vn),this.quaternion.premultiply(_n.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dn),kn.child=e,this.dispatchEvent(kn),kn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,e,xn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,Sn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};An.DEFAULT_UP=new H(0,1,0),An.DEFAULT_MATRIX_AUTO_UPDATE=!0,An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=class extends An{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Mn={type:`move`},Nn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},In={h:0,s:0,l:0};function Ln(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ue){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Vt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Vt.workingColorSpace){if(e=pt(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ln(i,r,e+1/3),this.g=Ln(i,r,e),this.b=Ln(i,r,e-1/3)}return Vt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ue){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ue){let n=Pn[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ht(e.r),this.g=Ht(e.g),this.b=Ht(e.b),this}copyLinearToSRGB(e){return this.r=Ut(e.r),this.g=Ut(e.g),this.b=Ut(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ue){return Vt.workingToColorSpace(Rn.copy(this),e),Math.round(ft(Rn.r*255,0,255))*65536+Math.round(ft(Rn.g*255,0,255))*256+Math.round(ft(Rn.b*255,0,255))}getHexString(e=Ue){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Vt.workingColorSpace){Vt.workingToColorSpace(Rn.copy(this),t);let n=Rn.r,r=Rn.g,i=Rn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Vt.workingColorSpace){return Vt.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=Ue){Vt.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,n=Rn.g,r=Rn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(In);let n=gt(Fn.h,In.h,t),r=gt(Fn.s,In.s,t),i=gt(Fn.l,In.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new G;G.NAMES=Pn;var zn=class extends An{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Bn=new H,Vn=new H,Hn=new H,Un=new H,Wn=new H,Gn=new H,Kn=new H,qn=new H,Jn=new H,Yn=new H,Xn=new Qt,Zn=new Qt,Qn=new Qt,$n=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Bn.subVectors(e,t),r.cross(Bn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Bn.subVectors(r,t),Vn.subVectors(n,t),Hn.subVectors(e,t);let a=Bn.dot(Bn),o=Bn.dot(Vn),s=Bn.dot(Hn),c=Vn.dot(Vn),l=Vn.dot(Hn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Un)!==null&&Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Un)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Un.x),s.addScaledVector(a,Un.y),s.addScaledVector(o,Un.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Xn.setScalar(0),Zn.setScalar(0),Qn.setScalar(0),Xn.fromBufferAttribute(e,t),Zn.fromBufferAttribute(e,n),Qn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xn,i.x),a.addScaledVector(Zn,i.y),a.addScaledVector(Qn,i.z),a}static isFrontFacing(e,t,n,r){return Bn.subVectors(n,t),Vn.subVectors(e,t),Bn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Bn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Wn.subVectors(r,n),Gn.subVectors(i,n),qn.subVectors(e,n);let s=Wn.dot(qn),c=Gn.dot(qn);if(s<=0&&c<=0)return t.copy(n);Jn.subVectors(e,r);let l=Wn.dot(Jn),u=Gn.dot(Jn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Wn,a);Yn.subVectors(e,i);let f=Wn.dot(Yn),p=Gn.dot(Yn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Gn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Kn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Kn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Wn,a).addScaledVector(Gn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},er=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=nr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,nr):nr.fromBufferAttribute(r,t),nr.applyMatrix4(e.matrixWorld),this.expandByPoint(nr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nr),nr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),dr.subVectors(this.max,ur),ir.subVectors(e.a,ur),ar.subVectors(e.b,ur),or.subVectors(e.c,ur),sr.subVectors(ar,ir),cr.subVectors(or,ar),lr.subVectors(ir,or);let t=[0,-sr.z,sr.y,0,-cr.z,cr.y,0,-lr.z,lr.y,sr.z,0,-sr.x,cr.z,0,-cr.x,lr.z,0,-lr.x,-sr.y,sr.x,0,-cr.y,cr.x,0,-lr.y,lr.x,0];return!mr(t,ir,ar,or,dr)||(t=[1,0,0,0,1,0,0,0,1],!mr(t,ir,ar,or,dr))?!1:(fr.crossVectors(sr,cr),t=[fr.x,fr.y,fr.z],mr(t,ir,ar,or,dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},tr=[new H,new H,new H,new H,new H,new H,new H,new H],nr=new H,rr=new er,ir=new H,ar=new H,or=new H,sr=new H,cr=new H,lr=new H,ur=new H,dr=new H,fr=new H,pr=new H;function mr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){pr.fromArray(e,a);let o=i.x*Math.abs(pr.x)+i.y*Math.abs(pr.y)+i.z*Math.abs(pr.z),s=t.dot(pr),c=n.dot(pr),l=r.dot(pr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var hr=new H,gr=new V,_r=0,vr=class extends ot{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_r++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Je,this.updateRanges=[],this.gpuType=g,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix3(e),this.setXY(t,gr.x,gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix4(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyNormalMatrix(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.transformDirection(e),this.setXYZ(t,hr.x,hr.y,hr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),i=Mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},yr=class extends vr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},br=class extends vr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},xr=class extends vr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Sr=new er,Cr=new H,wr=new H,Tr=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Sr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);let t=Cr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Cr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(wr)),this.expandByPoint(Cr.copy(e.center).sub(wr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Er=0,Dr=new W,Or=new An,kr=new H,Ar=new er,jr=new er,Mr=new H,Nr=class e extends ot{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Er++}),this.uuid=dt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Xe(e)?br:yr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new U().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Dr.makeRotationFromQuaternion(e),this.applyMatrix4(Dr),this}rotateX(e){return Dr.makeRotationX(e),this.applyMatrix4(Dr),this}rotateY(e){return Dr.makeRotationY(e),this.applyMatrix4(Dr),this}rotateZ(e){return Dr.makeRotationZ(e),this.applyMatrix4(Dr),this}translate(e,t,n){return Dr.makeTranslation(e,t,n),this.applyMatrix4(Dr),this}scale(e,t,n){return Dr.makeScale(e,t,n),this.applyMatrix4(Dr),this}lookAt(e){return Or.lookAt(e),Or.updateMatrix(),this.applyMatrix4(Or.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(kr).negate(),this.translate(kr.x,kr.y,kr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new xr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new er);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ar.setFromBufferAttribute(n),this.morphTargetsRelative?(Mr.addVectors(this.boundingBox.min,Ar.min),this.boundingBox.expandByPoint(Mr),Mr.addVectors(this.boundingBox.max,Ar.max),this.boundingBox.expandByPoint(Mr)):(this.boundingBox.expandByPoint(Ar.min),this.boundingBox.expandByPoint(Ar.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);return}if(e){let n=this.boundingSphere.center;if(Ar.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];jr.setFromBufferAttribute(n),this.morphTargetsRelative?(Mr.addVectors(Ar.min,jr.min),Ar.expandByPoint(Mr),Mr.addVectors(Ar.max,jr.max),Ar.expandByPoint(Mr)):(Ar.expandByPoint(jr.min),Ar.expandByPoint(jr.max))}Ar.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Mr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Mr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Mr.fromBufferAttribute(a,t),o&&(kr.fromBufferAttribute(e,t),Mr.add(kr)),r=Math.max(r,n.distanceToSquared(Mr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new vr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let c=new H,l=new H,u=new H,d=new V,f=new V,p=new V,m=new H,h=new H;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new H,y=new H,b=new H,x=new H;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new vr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mr.fromBufferAttribute(e,t),Mr.normalize(),e.setXYZ(t,Mr.x,Mr.y,Mr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new vr(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Pr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Je,this.updateRanges=[],this.version=0,this.uuid=dt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Fr=new H,Ir=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix4(e),this.setXYZ(t,Fr.x,Fr.y,Fr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyNormalMatrix(e),this.setXYZ(t,Fr.x,Fr.y,Fr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.transformDirection(e),this.setXYZ(t,Fr.x,Fr.y,Fr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=jt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=jt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=jt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=jt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=jt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),r=Mt(r,this.array),i=Mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){tt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new vr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Lr=new H,Rr=new H,zr=new U,Br=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Lr.subVectors(n,t).cross(Rr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Lr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zr.getNormalMatrix(e),r=this.coplanarPoint(Lr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Vr=0,Hr=class extends ot{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vr++}),this.uuid=dt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qe,this.stencilZFail=qe,this.stencilZPass=qe,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Br().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new V().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new V().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ur=class extends Hr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Wr,Gr=new H,Kr=new H,qr=new H,Jr=new V,Yr=new V,Xr=new W,Zr=new H,Qr=new H,$r=new H,ei=new V,ti=new V,ni=new V,ri=class extends An{constructor(e=new Ur){if(super(),this.isSprite=!0,this.type=`Sprite`,Wr===void 0){Wr=new Nr;let e=new Pr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Wr.setIndex([0,1,2,0,2,3]),Wr.setAttribute(`position`,new Ir(e,3,0,!1)),Wr.setAttribute(`uv`,new Ir(e,2,3,!1))}this.geometry=Wr,this.material=e,this.center=new V(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&B(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Kr.setFromMatrixScale(this.matrixWorld),Xr.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Kr.multiplyScalar(-qr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ii(Zr.set(-.5,-.5,0),qr,a,Kr,r,i),ii(Qr.set(.5,-.5,0),qr,a,Kr,r,i),ii($r.set(.5,.5,0),qr,a,Kr,r,i),ei.set(0,0),ti.set(1,0),ni.set(1,1);let o=e.ray.intersectTriangle(Zr,Qr,$r,!1,Gr);if(o===null&&(ii(Qr.set(-.5,.5,0),qr,a,Kr,r,i),ti.set(0,1),o=e.ray.intersectTriangle(Zr,$r,Qr,!1,Gr),o===null))return;let s=e.ray.origin.distanceTo(Gr);s<e.near||s>e.far||t.push({distance:s,point:Gr.clone(),uv:$n.getInterpolation(Gr,Zr,Qr,$r,ei,ti,ni,new V),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ii(e,t,n,r,i,a){Jr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Yr.copy(Jr):(Yr.x=a*Jr.x-i*Jr.y,Yr.y=i*Jr.x+a*Jr.y),e.copy(t),e.x+=Yr.x,e.y+=Yr.y,e.applyMatrix4(Xr)}var ai=new H,oi=new H,si=new H,ci=new H,li=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){oi.copy(e).add(t).multiplyScalar(.5),si.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(oi);let i=e.distanceTo(t)*.5,a=-this.direction.dot(si),o=ci.dot(this.direction),s=-ci.dot(si),c=ci.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(oi).addScaledVector(si,d),f}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),r=ai.dot(ai)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,ee,k,te,A,ne;if(y>=b&&y>=x?(w=s,D=u,k=p,ne=g,s>=0?(S=c,C=l,T=d,E=f,O=m,ee=h,te=_,A=v):(S=l,C=c,T=f,E=d,O=h,ee=m,te=v,A=_)):b>=x?(w=c,D=d,k=m,ne=_,c>=0?(S=l,C=s,T=f,E=u,O=h,ee=p,te=v,A=g):(S=s,C=l,T=u,E=f,O=p,ee=h,te=g,A=v)):(w=l,D=f,k=h,ne=v,l>=0?(S=s,C=c,T=u,E=d,O=p,ee=m,te=g,A=_):(S=c,C=s,T=d,E=u,O=m,ee=p,te=_,A=g)),w===0)return null;let j=S/w,M=C/w,N=1/w,re=T-j*D,ie=E-M*D,ae=O-j*k,oe=ee-M*k,se=te-j*ne,ce=A-M*ne,le=se*oe-ce*ae,P=re*ce-ie*se,ue=ae*ie-oe*re;if(r){if(le<0||P<0||ue<0)return null}else if((le<0||P<0||ue<0)&&(le>0||P>0||ue>0))return null;let de=le+P+ue;if(de===0)return null;let fe=N*(le*D+P*k+ue*ne);return(de>0?fe<0:fe>0)?null:this.at(fe/de,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ui=class extends Hr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},di=new W,fi=new li,pi=new Tr,mi=new H,hi=new H,gi=new H,_i=new H,vi=new H,yi=new H,bi=new H,xi=new H,Si=class extends An{constructor(e=new Nr,t=new ui){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){yi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(vi.fromBufferAttribute(s,e),a?yi.addScaledVector(vi,r):yi.addScaledVector(vi.sub(t),r))}t.add(yi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pi.copy(n.boundingSphere),pi.applyMatrix4(i),fi.copy(e.ray).recast(e.near),!(pi.containsPoint(fi.origin)===!1&&(fi.intersectSphere(pi,mi)===null||fi.origin.distanceToSquared(mi)>(e.far-e.near)**2))&&(di.copy(i).invert(),fi.copy(e.ray).applyMatrix4(di),(n.boundingBox===null||fi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=wi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=wi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=wi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=wi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ci(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;xi.copy(s),xi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(xi);return l<n.near||l>n.far?null:{distance:l,point:xi.clone(),object:e}}function wi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,hi),e.getVertexPosition(c,gi),e.getVertexPosition(l,_i);let u=Ci(e,t,n,r,hi,gi,_i,bi);if(u){let e=new H;$n.getBarycoord(bi,hi,gi,_i,e),i&&(u.uv=$n.getInterpolatedAttribute(i,s,c,l,e,new V)),a&&(u.uv1=$n.getInterpolatedAttribute(a,s,c,l,e,new V)),o&&(u.normal=$n.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};$n.getNormal(hi,gi,_i,t.normal),u.face=t,u.barycoord=e}return u}var Ti=new Qt,Ei=new Qt,Di=new Qt,Oi=new Qt,ki=new W,Ai=new H,ji=new Tr,Mi=new W,Ni=new li,Pi=class extends Si{constructor(t,n){super(t,n),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=e,this.bindMatrix=new W,this.bindMatrixInverse=new W,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new er),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Ai),this.boundingBox.expandByPoint(Ai)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Tr),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,Ai),this.boundingSphere.expandByPoint(Ai)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ji.copy(this.boundingSphere),ji.applyMatrix4(r),e.ray.intersectsSphere(ji)!==!1&&(Mi.copy(r).invert(),Ni.copy(e.ray).applyMatrix4(Mi),(this.boundingBox===null||Ni.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,Ni)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Qt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():z(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Ei.fromBufferAttribute(r.attributes.skinIndex,e),Di.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Ti.copy(t),t.set(0,0,0,0)):(Ti.set(...t,1),t.set(0,0,0)),Ti.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Di.getComponent(e);if(r!==0){let i=Ei.getComponent(e);ki.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(Oi.copy(Ti).applyMatrix4(ki),r)}}return t.isVector4&&(t.w=Ti.w),t.applyMatrix4(this.bindMatrixInverse)}},Fi=class extends An{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Ii=class extends Zt{constructor(e=null,t=1,n=1,r,a,o,s,c,l=i,u=i,d,f){super(null,o,s,c,l,u,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Li=new W,Ri=new W,zi=class e{constructor(e=[],t=[]){this.uuid=dt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){z(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new W)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new W;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Ri;Li.multiplyMatrices(i,t[r]),Li.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ii(t,e,e,T,g);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(z(`Skeleton: No bone found with UUID:`,r),i=new Fi),this.bones.push(i),this.boneInverses.push(new W().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Bi=class extends vr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Vi=new W,Hi=new W,Ui=[],Wi=new er,Gi=new W,Ki=new Si,qi=new Tr,Ji=class extends Si{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Gi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new er),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vi),Wi.copy(e.boundingBox).applyMatrix4(Vi),this.boundingBox.union(Wi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vi),qi.copy(e.boundingSphere).applyMatrix4(Vi),this.boundingSphere.union(qi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ki.geometry=this.geometry,Ki.material=this.material,Ki.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qi.copy(this.boundingSphere),qi.applyMatrix4(n),e.ray.intersectsSphere(qi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Vi),Hi.multiplyMatrices(n,Vi),Ki.matrixWorld=Hi,Ki.raycast(e,Ui);for(let e=0,n=Ui.length;e<n;e++){let n=Ui[e];n.instanceId=i,n.object=this,t.push(n)}Ui.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ii(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Yi=new Tr,Xi=new V(.5,.5),Zi=new H,Qi=class{constructor(e=new Br,t=new Br,n=new Br,r=new Br,i=new Br,a=new Br){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ye,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(e){return Yi.center.set(0,0,0),Yi.radius=.7071067811865476+Xi.distanceTo(e.center),Yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Zi.x=r.normal.x>0?e.max.x:e.min.x,Zi.y=r.normal.y>0?e.max.y:e.min.y,Zi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},$i=class extends Hr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ea=new H,ta=new H,na=new W,ra=new li,ia=new Tr,aa=new H,oa=new H,sa=class extends An{constructor(e=new Nr,t=new $i){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ea.fromBufferAttribute(t,e-1),ta.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ea.distanceTo(ta);e.setAttribute(`lineDistance`,new xr(n,1))}else z(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(r),ia.radius+=i,e.ray.intersectsSphere(ia)===!1)return;na.copy(r).invert(),ra.copy(e.ray).applyMatrix4(na);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ca(this,e,ra,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ca(this,e,ra,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ca(this,e,ra,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ca(this,e,ra,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ca(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ea.fromBufferAttribute(s,i),ta.fromBufferAttribute(s,a),n.distanceSqToSegment(ea,ta,aa,oa)>r)return;aa.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(aa);if(!(c<t.near||c>t.far))return{distance:c,point:oa.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var la=new H,ua=new H,da=class extends sa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)la.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+la.distanceTo(ua);e.setAttribute(`lineDistance`,new xr(n,1))}else z(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},fa=class extends sa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},pa=class extends Hr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ma=new W,ha=new li,ga=new Tr,_a=new H,va=class extends An{constructor(e=new Nr,t=new pa){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(r),ga.radius+=i,e.ray.intersectsSphere(ga)===!1)return;ma.copy(r).invert(),ha.copy(e.ray).applyMatrix4(ma);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);_a.fromBufferAttribute(l,n),ya(_a,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)_a.fromBufferAttribute(l,a),ya(_a,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ya(e,t,n,r,i,a,o){let s=ha.distanceSqToPoint(e);if(s<n){let n=new H;ha.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ba=class extends Zt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},xa=class extends Zt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sa=class extends Zt{constructor(e,t,n=h,r,a,o,s=i,c=i,l,u=E,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ca=class extends Sa{constructor(e,t=h,n=301,r,a,o=i,s=i,c,l=E){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},wa=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ta=class e extends Nr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new xr(c,3)),this.setAttribute(`normal`,new xr(l,3)),this.setAttribute(`uv`,new xr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ea=class e extends Nr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new xr(p,3)),this.setAttribute(`normal`,new xr(m,3)),this.setAttribute(`uv`,new xr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};function Da(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ka(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(ka(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Oa(e){let t={};for(let n=0;n<e.length;n++){let r=Da(e[n]);for(let e in r)t[e]=r[e]}return t}function ka(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Aa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ja(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}var Ma={clone:Da,merge:Oa},Na=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fa=class extends Hr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Na,this.fragmentShader=Pa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Da(e.uniforms),this.uniformsGroups=Aa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Qt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new W().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ia=class extends Fa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},La=class extends Hr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new V(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ra=class extends La{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new V(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},za=class extends Hr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=He,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ba=class extends Hr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Va(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ha(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function Ua(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function Wa(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function Ga(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var Ka=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},qa=class extends Ka{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:R,endingEnd:R}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Re:i=e,o=2*t-n;break;case ze:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Re:a=e,s=2*n-t;break;case ze:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ja=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ya=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Xa=class extends Ka{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=$a(n,t,g,y,r);i[p]=Za(x,o,_,b,m)}return i}};function Za(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Qa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function $a(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Za(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Qa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var eo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Va(t,this.TimeBufferType),this.values=Va(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Va(e.times,Array),values:Va(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ha(e.settings)&&(n.settings={inTangents:Va(e.settings.inTangents,Array),outTangents:Va(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Xa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ie:t=this.InterpolantFactoryMethodDiscrete;break;case I:t=this.InterpolantFactoryMethodLinear;break;case Le:t=this.InterpolantFactoryMethodSmooth;break;case L:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ie;case this.InterpolantFactoryMethodLinear:return I;case this.InterpolantFactoryMethodSmooth:return Le;case this.InterpolantFactoryMethodBezier:return L}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ha(this.settings)&&(to(this.settings.inTangents,e),to(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ze(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Le,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ha(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function to(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}eo.prototype.ValueTypeName=``,eo.prototype.TimeBufferType=Float32Array,eo.prototype.ValueBufferType=Float32Array,eo.prototype.DefaultInterpolation=I;var no=class extends eo{constructor(e,t,n){super(e,t,n)}};no.prototype.ValueTypeName=`bool`,no.prototype.ValueBufferType=Array,no.prototype.DefaultInterpolation=Ie,no.prototype.InterpolantFactoryMethodLinear=void 0,no.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};ro.prototype.ValueTypeName=`color`;var io=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};io.prototype.ValueTypeName=`number`;var ao=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Pt.slerpFlat(i,0,a,c-o,a,c,s);return i}},oo=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ao(this.times,this.values,this.getValueSize(),e)}};oo.prototype.ValueTypeName=`quaternion`,oo.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends eo{constructor(e,t,n){super(e,t,n)}};so.prototype.ValueTypeName=`string`,so.prototype.ValueBufferType=Array,so.prototype.DefaultInterpolation=Ie,so.prototype.InterpolantFactoryMethodLinear=void 0,so.prototype.InterpolantFactoryMethodSmooth=void 0;var co=class extends eo{constructor(e,t,n,r){super(e,t,n,r)}};co.prototype.ValueTypeName=`vector`;var lo=class{constructor(e=``,t=-1,n=[],r=Be){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=dt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(fo(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(eo.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=Ua(o);o=Wa(o,1,c),s=Wa(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new io(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function uo(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return io;case`vector`:case`vector2`:case`vector3`:case`vector4`:return co;case`color`:return ro;case`quaternion`:return oo;case`bool`:case`boolean`:return no;case`string`:return so}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function fo(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=uo(e.type);if(e.times===void 0){let t=[],n=[];Ga(e.keys,t,n,`value`),e.times=t,e.values=n}let n;return n=t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e),Ha(e.settings)&&(n.settings={inTangents:Va(e.settings.inTangents,Float32Array),outTangents:Va(e.settings.outTangents,Float32Array)}),n}var po={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(mo(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!mo(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function mo(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var ho=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},go=class{constructor(e){this.manager=e===void 0?ho:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};go.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var _o={},vo=class extends Error{constructor(e,t){super(e),this.response=t}},yo=class extends go{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=po.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(_o[e]!==void 0){_o[e].push({onLoad:t,onProgress:n,onError:r});return}_o[e]=[],_o[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&z(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=_o[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new vo(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{po.add(`file:${e}`,t);let n=_o[e];delete _o[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=_o[e];if(n===void 0)throw this.manager.itemError(e),t;delete _o[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},bo=new WeakMap,xo=class extends go{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=po.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=bo.get(a);e===void 0&&(e=[],bo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Qe(`img`);function s(){l(),t&&t(this);let n=bo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}bo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),po.remove(`image:${e}`);let n=bo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}bo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),po.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},So=class extends go{constructor(e){super(e)}load(e,t,n,r){let i=new Zt,a=new xo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Co=class extends An{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},wo=new W,To=new H,Eo=new H,Do=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new V(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new W,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new V(1,1),this._viewportCount=1,this._viewports=[new Qt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;To.setFromMatrixPosition(e.matrixWorld),t.position.copy(To),Eo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Eo),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(wo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Oo=new H,ko=new Pt,Ao=new H,jo=class extends An{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new W,this.projectionMatrix=new W,this.projectionMatrixInverse=new W,this.coordinateSystem=Ye,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Oo,ko,Ao),Ao.x===1&&Ao.y===1&&Ao.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oo,ko,Ao.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Oo,ko,Ao),Ao.x===1&&Ao.y===1&&Ao.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oo,ko,Ao.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Mo=new H,No=new V,Po=new V,Fo=class extends jo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ut*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(lt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ut*2*Math.atan(Math.tan(lt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mo.x,Mo.y).multiplyScalar(-e/Mo.z),Mo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mo.x,Mo.y).multiplyScalar(-e/Mo.z)}getViewSize(e,t){return this.getViewBounds(e,No,Po),t.subVectors(Po,No)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(lt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Io=class extends Do{constructor(){super(new Fo(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ut*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Lo=class extends Co{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.target=new An,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Io}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Ro=class extends Do{constructor(){super(new Fo(90,1,.5,500)),this.isPointLightShadow=!0}},zo=class extends Co{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Ro}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Bo=class extends jo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vo=class extends Do{constructor(){super(new Bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ho=class extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.target=new An,this.shadow=new Vo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Uo=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Wo=new WeakMap,Go=class extends go{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&z(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&z(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=po.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{Wo.has(a)===!0?(r&&r(Wo.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign({},i.options,{colorSpaceConversion:`none`}))}).then(function(n){return po.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e),n}).catch(function(t){r&&r(t),Wo.set(s,t),po.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});po.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Ko=-90,qo=1,Jo=class extends An{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Fo(Ko,qo,e,t);r.layers=this.layers,this.add(r);let i=new Fo(Ko,qo,e,t);i.layers=this.layers,this.add(i);let a=new Fo(Ko,qo,e,t);a.layers=this.layers,this.add(a);let o=new Fo(Ko,qo,e,t);o.layers=this.layers,this.add(o);let s=new Fo(Ko,qo,e,t);s.layers=this.layers,this.add(s);let c=new Fo(Ko,qo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Yo=class extends Fo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Xo=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Zo.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Zo(){this._document.hidden===!1&&this.reset()}var Qo=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let r,i,a;switch(t){case`quaternion`:r=this._slerp,i=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case`string`:case`bool`:r=this._select,i=this._select,a=this._setAdditiveIdentityOther,this.buffer=Array(n*5);break;default:r=this._lerp,i=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=i,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,r=this.valueSize,i=e*r+r,a=this.cumulativeWeight;if(a===0){for(let e=0;e!==r;++e)n[i+e]=n[e];a=t}else{a+=t;let e=t/a;this._mixBufferRegion(n,i,0,e,r)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,r=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,r=e*t+t,i=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,i<1){let e=t*this._origIndex;this._mixBufferRegion(n,r,e,1-i,t)}a>0&&this._mixBufferRegionAdditive(n,r,this._addIndex*t,1,t);for(let e=t,i=t+t;e!==i;++e)if(n[e]!==n[e+t]){o.setValue(n,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,r=n*this._origIndex;e.getValue(t,r);for(let e=n,i=r;e!==i;++e)t[e]=t[r+e%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,r,i){if(r>=.5)for(let r=0;r!==i;++r)e[t+r]=e[n+r]}_slerp(e,t,n,r){Pt.slerpFlat(e,t,e,t,e,n,r)}_slerpAdditive(e,t,n,r,i){let a=this._workIndex*i;Pt.multiplyQuaternionsFlat(e,a,e,t,e,n),Pt.slerpFlat(e,t,e,t,e,a,r)}_lerp(e,t,n,r,i){let a=1-r;for(let o=0;o!==i;++o){let i=t+o;e[i]=e[i]*a+e[n+o]*r}}_lerpAdditive(e,t,n,r,i){for(let a=0;a!==i;++a){let i=t+a;e[i]=e[i]+e[n+a]*r}}},$o=`\\[\\]\\.:\\/`,es=RegExp(`[\\[\\]\\.:\\/]`,`g`),ts=`[^\\[\\]\\.:\\/]`,ns=`[^`+$o.replace(`\\.`,``)+`]`,rs=`((?:WC+[\\/:])*)`.replace(`WC`,ts),is=`(WCOD+)?`.replace(`WCOD`,ns),as=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ts),os=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ts),ss=RegExp(`^`+rs+is+as+os+`$`),cs=[`material`,`materials`,`bones`,`map`],ls=class{constructor(e,t,n){let r=n||us.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},us=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(es,``)}static parseTrackName(e){let t=ss.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);cs.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};us.Composite=ls,us.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},us.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},us.prototype.GetterByBindingType=[us.prototype._getValue_direct,us.prototype._getValue_array,us.prototype._getValue_arrayElement,us.prototype._getValue_toArray],us.prototype.SetterByBindingTypeAndVersioning=[[us.prototype._setValue_direct,us.prototype._setValue_direct_setNeedsUpdate,us.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[us.prototype._setValue_array,us.prototype._setValue_array_setNeedsUpdate,us.prototype._setValue_array_setMatrixWorldNeedsUpdate],[us.prototype._setValue_arrayElement,us.prototype._setValue_arrayElement_setNeedsUpdate,us.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[us.prototype._setValue_fromArray,us.prototype._setValue_fromArray_setNeedsUpdate,us.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ds=class{constructor(e,t,n=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=r;let i=t.tracks,a=i.length,o=Array(a),s={endingStart:R,endingEnd:R};for(let e=0;e!==a;++e){let t=i[e].createInterpolant(null);o[e]=t,t.settings=s}this._interpolantSettings=s,this._interpolants=o,this._propertyBindings=Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Pe,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let n=this._clip.duration,r=e._clip.duration,i=r/n,a=n/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,i,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let r=this._mixer,i=r.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=r._lendControlInterpolant(),this._timeScaleInterpolant=o);let s=o.parameterPositions,c=o.sampleValues;return s[0]=i,s[1]=i+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,r){if(!this.enabled){this._updateWeight(e);return}let i=this._startTime;if(i!==null){let r=(e-i)*n;r<0||n===0?t=0:(this._startTime=null,t=n*r)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let e=this._interpolants,t=this._propertyBindings;switch(this.blendMode){case Ve:for(let n=0,r=e.length;n!==r;++n)e[n].evaluate(a),t[n].accumulateAdditive(o);break;case Be:default:for(let n=0,i=e.length;n!==i;++n)e[n].evaluate(a),t[n].accumulate(r,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let r=n.evaluate(e)[0];t*=r,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,r=this.time+e,i=this._loopCount,a=n===Fe;if(e===0)return i===-1?r:a&&(i&1)==1?t-r:r;if(n===2200){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));handle_stop:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break handle_stop}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e<0?-1:1})}}else{if(i===-1&&(e>=0?(i=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),r>=t||r<0){let n=Math.floor(r/t);r-=t*n,i+=Math.abs(n);let o=this.repetitions-i;if(o<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:`finished`,action:this,direction:e>0?1:-1});else{if(o===1){let t=e<0;this._setEndings(t,!t,a)}else this._setEndings(!1,!1,a);this._loopCount=i,this.time=r,this._mixer.dispatchEvent({type:`loop`,action:this,loopDelta:n})}}else this._loopCount=i,this.time=r;if(a&&(i&1)==1)return t-r}return r}_setEndings(e,t,n){let r=this._interpolantSettings;n?(r.endingStart=Re,r.endingEnd=Re):(r.endingStart=e?this.zeroSlopeAtStart?Re:R:ze,r.endingEnd=t?this.zeroSlopeAtEnd?Re:R:ze)}_scheduleFading(e,t,n){let r=this._mixer,i=r.time,a=this._weightInterpolant;a===null&&(a=r._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,s=a.sampleValues;return o[0]=i,s[0]=t,o[1]=i+e,s[1]=n,this}},fs=new Float32Array(1),ps=class extends ot{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,r=e._clip.tracks,i=r.length,a=e._propertyBindings,o=e._interpolants,s=n.uuid,c=this._bindingsByRootAndName,l=c[s];l===void 0&&(l={},c[s]=l);for(let e=0;e!==i;++e){let i=r[e],c=i.name,u=l[c];if(u!==void 0)++u.referenceCount,a[e]=u;else{if(u=a[e],u!==void 0){u._cacheIndex===null&&(++u.referenceCount,this._addInactiveBinding(u,s,c));continue}let r=t&&t._propertyBindings[e].binding.parsedPath;u=new Qo(us.create(n,c,r),i.ValueTypeName,i.getValueSize()),++u.referenceCount,this._addInactiveBinding(u,s,c),a[e]=u}o[e].resultBuffer=u.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let t=(e._localRoot||this._root).uuid,n=e._clip.uuid,r=this._actionsByClip[n];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,n,t)}let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];n.useCount++===0&&(this._lendBinding(n),n.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.useCount===0&&(n.restoreOriginalState(),this._takeBackBinding(n))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let r=this._actions,i=this._actionsByClip,a=i[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=a;else{let t=a.knownActions;e._byClipCacheIndex=t.length,t.push(e)}e._cacheIndex=r.length,r.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],r=e._cacheIndex;n._cacheIndex=r,t[r]=n,t.pop(),e._cacheIndex=null;let i=e._clip.uuid,a=this._actionsByClip,o=a[i],s=o.knownActions,c=s[s.length-1],l=e._byClipCacheIndex;c._byClipCacheIndex=l,s[l]=c,s.pop(),e._byClipCacheIndex=null;let u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],s.length===0&&delete a[i],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let e=0,n=t.length;e!==n;++e){let n=t[e];--n.referenceCount===0&&this._removeInactiveBinding(n)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,r=this._nActiveActions++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,r=--this._nActiveActions,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_addInactiveBinding(e,t,n){let r=this._bindingsByRootAndName,i=this._bindings,a=r[t];a===void 0&&(a={},r[t]=a),a[n]=e,e._cacheIndex=i.length,i.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,r=n.rootNode.uuid,i=n.path,a=this._bindingsByRootAndName,o=a[r],s=t[t.length-1],c=e._cacheIndex;s._cacheIndex=c,t[c]=s,t.pop(),delete o[i],Object.keys(o).length===0&&delete a[r]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,r=this._nActiveBindings++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,r=--this._nActiveBindings,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=n,t[n]=i}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Ja(new Float32Array(2),new Float32Array(2),1,fs),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,r=--this._nActiveControlInterpolants,i=t[r];e.__cacheIndex=r,t[r]=e,i.__cacheIndex=n,t[n]=i}clipAction(e,t,n){let r=t||this._root,i=r.uuid,a=typeof e==`string`?lo.findByName(r,e):e,o=a===null?e:a.uuid,s=this._actionsByClip[o],c=null;if(n===void 0&&(n=a===null?Be:a.blendMode),s!==void 0){let e=s.actionByRoot[i];if(e!==void 0&&e.blendMode===n)return e;c=s.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let l=new ds(this,a,t,n);return this._bindAction(l,c),this._addInactiveAction(l,o,i),l}existingAction(e,t){let n=t||this._root,r=n.uuid,i=typeof e==`string`?lo.findByName(n,e):e,a=i?i.uuid:e,o=this._actionsByClip[a];return o===void 0?null:o.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,r=this.time+=e,i=Math.sign(e),a=this._accuIndex^=1;for(let o=0;o!==n;++o)t[o]._update(r,e,i,a);let o=this._bindings,s=this._nActiveBindings;for(let e=0;e!==s;++e)o[e].apply(a);return this}setTime(e){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,r=this._actionsByClip,i=r[n];if(i!==void 0){let e=i.knownActions;for(let n=0,r=e.length;n!==r;++n){let r=e[n];this._deactivateAction(r);let i=r._cacheIndex,a=t[t.length-1];r._cacheIndex=null,r._byClipCacheIndex=null,a._cacheIndex=i,t[i]=a,t.pop(),this._removeInactiveBindingsForAction(r)}delete r[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let e in n){let r=n[e].actionByRoot[t];r!==void 0&&(this._deactivateAction(r),this._removeInactiveAction(r))}let r=this._bindingsByRootAndName[t];if(r!==void 0)for(let e in r){let t=r[e];t.restoreOriginalState(),this._removeInactiveBinding(t)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function ms(e,t,n,r){let i=hs(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case A:return e*t*4/i.components*i.byteLength;case ne:case j:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case M:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ie:case oe:return Math.max(e,16)*Math.max(t,8)/4;case re:case ae:return Math.max(e,8)*Math.max(t,8)/2;case se:case ce:case P:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case le:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Te:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ee:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case De:case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function hs(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function gs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function _s(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var K={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U}},envmap:{envMap:{value:null},envMapRotation:{value:new U},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U},normalScale:{value:new V(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0},uvTransform:{value:new U}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new V(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U},alphaMap:{value:null},alphaMapTransform:{value:new U},alphaTest:{value:0}}},vs={basic:{uniforms:Oa([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:K.meshbasic_vert,fragmentShader:K.meshbasic_frag},lambert:{uniforms:Oa([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:K.meshlambert_vert,fragmentShader:K.meshlambert_frag},phong:{uniforms:Oa([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:K.meshphong_vert,fragmentShader:K.meshphong_frag},standard:{uniforms:Oa([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},toon:{uniforms:Oa([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new G(0)}}]),vertexShader:K.meshtoon_vert,fragmentShader:K.meshtoon_frag},matcap:{uniforms:Oa([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:K.meshmatcap_vert,fragmentShader:K.meshmatcap_frag},points:{uniforms:Oa([q.points,q.fog]),vertexShader:K.points_vert,fragmentShader:K.points_frag},dashed:{uniforms:Oa([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:K.linedashed_vert,fragmentShader:K.linedashed_frag},depth:{uniforms:Oa([q.common,q.displacementmap]),vertexShader:K.depth_vert,fragmentShader:K.depth_frag},normal:{uniforms:Oa([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:K.meshnormal_vert,fragmentShader:K.meshnormal_frag},sprite:{uniforms:Oa([q.sprite,q.fog]),vertexShader:K.sprite_vert,fragmentShader:K.sprite_frag},background:{uniforms:{uvTransform:{value:new U},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:K.background_vert,fragmentShader:K.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U}},vertexShader:K.backgroundCube_vert,fragmentShader:K.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:K.cube_vert,fragmentShader:K.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:K.equirect_vert,fragmentShader:K.equirect_frag},distance:{uniforms:Oa([q.common,q.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:K.distance_vert,fragmentShader:K.distance_frag},shadow:{uniforms:Oa([q.lights,q.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:K.shadow_vert,fragmentShader:K.shadow_frag}};vs.physical={uniforms:Oa([vs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U},clearcoatNormalScale:{value:new V(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U},transmissionSamplerSize:{value:new V},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U},anisotropyVector:{value:new V},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag};var ys={r:0,b:0,g:0},bs=new W,xs=new U;xs.set(-1,0,0,0,1,0,0,0,1);function Ss(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Si(new Ta(1,1,1),new Fa({name:`BackgroundCubeMaterial`,uniforms:Da(vs.backgroundCube.uniforms),vertexShader:vs.backgroundCube.vertexShader,fragmentShader:vs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xs),l.material.toneMapped=Vt.getTransfer(i.colorSpace)!==Ke,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Si(new Ea(2,2),new Fa({name:`BackgroundMaterial`,uniforms:Da(vs.background.uniforms),vertexShader:vs.background.vertexShader,fragmentShader:vs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Vt.getTransfer(i.colorSpace)!==Ke,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ys,ja(e)),n.buffers.color.setClear(ys.r,ys.g,ys.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Cs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ws(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ts(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Es(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Br,s=new U,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ds=4,Os=6,ks=20,As=256,js=new Bo,Ms=new G,Ns=null,Ps=0,Fs=0,Is=!1,Ls=new H,Rs=new H,zs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ls}=i;Ns=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Fs=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ks(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ns,Ps,Fs),this._renderer.xr.enabled=Is,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ns=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Fs=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:s,minFilter:s,generateMipmaps:!1,type:_,format:T,colorSpace:We,depthBuffer:!1},r=Vs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Bs(r)),this._blurMaterial=Ws(r,e,t),this._ggxMaterial=Us(r,e,t)}return r}_compileMaterial(e){let t=new Si(new Nr,e);this._renderer.compile(t,js)}_sceneToCubeUV(e,t,n,r,i){let a=new Fo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ms),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Si(new Ta,new ui({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ms),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Hs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ks()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Hs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,js)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ds?n-d+Ds:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Hs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,js),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Hs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,js)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Hs(t,3*l*(r>this._lodMax-Ds?r-this._lodMax+Ds:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,js)}};function Bs(e){let t=[],n=[],r=e,i=e-Ds+1+Os;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Rs.set(1,r,n):e===1?Rs.set(-n,1,-r):e===2?Rs.set(-n,r,1):e===3?Rs.set(-1,r,-n):e===4?Rs.set(-n,-1,r):Rs.set(n,r,-1),Rs.toArray(l,(e*6+t)*3)}}let u=new Nr;u.setAttribute(`position`,new vr(c,3)),u.setAttribute(`outputDirection`,new vr(l,3)),n.push(new Si(u,null)),r>Ds&&r--}return{lodMeshes:n,sizeLods:t}}function Vs(e,t,n){let r=new en(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Hs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Us(e,t,n){return new Fa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:As,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ws(e,t,n){return new Fa({name:`SphericalGaussianBlur`,defines:{SAMPLES:ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Gs(){return new Fa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ks(){return new Fa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Js=class extends en{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ba(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ta(5,5,5),i=new Fa({name:`CubemapFromEquirect`,uniforms:Da(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Si(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=s),new Jo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ys(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Js(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new zs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new zs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Xs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Zs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?br:yr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Qs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function $s(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ec(e,t,n){let r=new WeakMap,i=new Qt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),_=new tn(h,p,m,u);_.type=g,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new V(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function tc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var nc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function rc(e,t,n,r,i,a){let o=new en(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Nr;l.setAttribute(`position`,new xr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new xr([0,2,0,0,2,0],2));let u=new Ia({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Si(l,u),f=new Bo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new en(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),c=new en(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Vt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=nc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ic=new Zt,ac=new Sa(1,1),oc=new tn,sc=new nn,cc=new ba,lc=[],uc=[],dc=new Float32Array(16),fc=new Float32Array(9),pc=new Float32Array(4);function mc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=lc[i];if(a===void 0&&(a=new Float32Array(i),lc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function hc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function gc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function _c(e,t){let n=uc[t];n===void 0&&(n=new Int32Array(t),uc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2fv(this.addr,t),gc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(hc(n,t))return;e.uniform3fv(this.addr,t),gc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4fv(this.addr,t),gc(n,t)}}function Sc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;pc.set(r),e.uniformMatrix2fv(this.addr,!1,pc),gc(n,r)}}function Cc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;fc.set(r),e.uniformMatrix3fv(this.addr,!1,fc),gc(n,r)}}function wc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;dc.set(r),e.uniformMatrix4fv(this.addr,!1,dc),gc(n,r)}}function Tc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2iv(this.addr,t),gc(n,t)}}function Dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hc(n,t))return;e.uniform3iv(this.addr,t),gc(n,t)}}function Oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4iv(this.addr,t),gc(n,t)}}function kc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2uiv(this.addr,t),gc(n,t)}}function jc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hc(n,t))return;e.uniform3uiv(this.addr,t),gc(n,t)}}function Mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4uiv(this.addr,t),gc(n,t)}}function Nc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ac.compareFunction=n.isReversedDepthBuffer()?518:515,a=ac):a=ic,n.setTexture2D(t||a,i)}function Pc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||sc,i)}function Fc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||cc,i)}function Ic(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||oc,i)}function Lc(e){switch(e){case 5126:return vc;case 35664:return yc;case 35665:return bc;case 35666:return xc;case 35674:return Sc;case 35675:return Cc;case 35676:return wc;case 5124:case 35670:return Tc;case 35667:case 35671:return Ec;case 35668:case 35672:return Dc;case 35669:case 35673:return Oc;case 5125:return kc;case 36294:return Ac;case 36295:return jc;case 36296:return Mc;case 35678:case 36198:case 36298:case 36306:case 35682:return Nc;case 35679:case 36299:case 36307:return Pc;case 35680:case 36300:case 36308:case 36293:return Fc;case 36289:case 36303:case 36311:case 36292:return Ic}}function Rc(e,t){e.uniform1fv(this.addr,t)}function zc(e,t){let n=mc(t,this.size,2);e.uniform2fv(this.addr,n)}function Bc(e,t){let n=mc(t,this.size,3);e.uniform3fv(this.addr,n)}function Vc(e,t){let n=mc(t,this.size,4);e.uniform4fv(this.addr,n)}function Hc(e,t){let n=mc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Uc(e,t){let n=mc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Wc(e,t){let n=mc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Gc(e,t){e.uniform1iv(this.addr,t)}function Kc(e,t){e.uniform2iv(this.addr,t)}function qc(e,t){e.uniform3iv(this.addr,t)}function Jc(e,t){e.uniform4iv(this.addr,t)}function Yc(e,t){e.uniform1uiv(this.addr,t)}function Xc(e,t){e.uniform2uiv(this.addr,t)}function Zc(e,t){e.uniform3uiv(this.addr,t)}function Qc(e,t){e.uniform4uiv(this.addr,t)}function $c(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ac:ic;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function el(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||sc,a[e])}function tl(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||cc,a[e])}function nl(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||oc,a[e])}function rl(e){switch(e){case 5126:return Rc;case 35664:return zc;case 35665:return Bc;case 35666:return Vc;case 35674:return Hc;case 35675:return Uc;case 35676:return Wc;case 5124:case 35670:return Gc;case 35667:case 35671:return Kc;case 35668:case 35672:return qc;case 35669:case 35673:return Jc;case 5125:return Yc;case 36294:return Xc;case 36295:return Zc;case 36296:return Qc;case 35678:case 36198:case 36298:case 36306:case 35682:return $c;case 35679:case 36299:case 36307:return el;case 35680:case 36300:case 36308:case 36293:return tl;case 36289:case 36303:case 36311:case 36292:return nl}}var il=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lc(t.type)}},al=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rl(t.type)}},ol=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},sl=/(\w+)(\])?(\[|\.)?/g;function cl(e,t){e.seq.push(t),e.map[t.id]=t}function ll(e,t,n){let r=e.name,i=r.length;for(sl.lastIndex=0;;){let a=sl.exec(r),o=sl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){cl(n,l===void 0?new il(s,e,t):new al(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ol(s),cl(n,e)),n=e}}}var ul=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);ll(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function dl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var fl=37297,pl=0;function ml(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var hl=new U;function gl(e){Vt._getMatrix(hl,Vt.workingColorSpace,e);let t=`mat3( ${hl.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(e)){case Ge:return[t,`LinearTransferOETF`];case Ke:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function _l(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ml(e.getShaderSource(t),r)}return i}function vl(e,t){let n=gl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var yl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function bl(e,t){let n=yl[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var xl=new H;function Sl(){return Vt.getLuminanceCoefficients(xl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${xl.x.toFixed(4)}, ${xl.y.toFixed(4)}, ${xl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Cl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(El).join(`
`)}function wl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Tl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function El(e){return e!==``}function Dl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ol(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Al(e){return e.replace(kl,Ml)}var jl=new Map;function Ml(e,t){let n=K[t];if(n===void 0){let e=jl.get(t);if(e!==void 0)n=K[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Al(n)}var Nl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(e){return e.replace(Nl,Fl)}function Fl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Il(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ll={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Rl(e){return Ll[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var zl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Bl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:zl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Vl={302:`ENVMAP_MODE_REFRACTION`};function Hl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Vl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ul={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Wl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ul[e.combine]||`ENVMAP_BLENDING_NONE`}function Gl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Kl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Rl(n),l=Bl(n),u=Hl(n),d=Wl(n),f=Gl(n),p=Cl(n),m=wl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(El).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(El).join(`
`),_.length>0&&(_+=`
`)):(g=[Il(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(El).join(`
`),_=[Il(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:K.tonemapping_pars_fragment,n.toneMapping===0?``:bl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,K.colorspace_pars_fragment,vl(`linearToOutputTexel`,n.outputColorSpace),Sl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(El).join(`
`)),o=Al(o),o=Dl(o,n),o=Ol(o,n),s=Al(s),s=Dl(s,n),s=Ol(s,n),o=Pl(o),s=Pl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=dl(i,i.VERTEX_SHADER,y),S=dl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=_l(i,x,`vertex`),n=_l(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new ul(i,h),T=Tl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,fl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var ql=0,Jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yl(e),t.set(e,n)),n}},Yl=class{constructor(e){this.id=ql++,this.code=e,this.usedTimes=0}};function Xl(e){return e===1030||e===37490||e===36285}function Zl(e,t,n,r,i,a){let o=new mn,s=new Jl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(C){let e=vs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,k=t.id}let te=e.getRenderTarget(),A=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,M=!!i.map,N=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.dispersion>0,me=i.retroreflectivity>0,he=i.iridescence>0,ge=i.sheen>0,_e=i.transmission>0,ve=de&&!!i.anisotropyMap,ye=fe&&!!i.clearcoatMap,be=fe&&!!i.clearcoatNormalMap,xe=fe&&!!i.clearcoatRoughnessMap,Se=he&&!!i.iridescenceMap,Ce=he&&!!i.iridescenceThicknessMap,we=ge&&!!i.sheenColorMap,Te=ge&&!!i.sheenRoughnessMap,Ee=!!i.specularMap,De=!!i.specularColorMap,Oe=!!i.specularIntensityMap,ke=_e&&!!i.transmissionMap,Ae=_e&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,F=!!i.alphaHash,Pe=!!i.extensions,Fe=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Fe=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Vt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Xl(i.normalMap.format),metalnessMap:P,roughnessMap:ue,anisotropy:de,anisotropyMap:ve,clearcoat:fe,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:xe,dispersion:pe,retroreflection:me,iridescence:he,iridescenceMap:Se,iridescenceThicknessMap:Ce,sheen:ge,sheenColorMap:we,sheenRoughnessMap:Te,specularMap:Ee,specularColorMap:De,specularIntensityMap:Oe,transmission:_e,transmissionMap:ke,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:F,combine:i.combine,mapUv:M&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:P&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ve&&m(i.anisotropyMap.channel),clearcoatMapUv:ye&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:we&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Te&&m(i.sheenRoughnessMap.channel),specularMapUv:Ee&&m(i.specularMap.channel),specularColorMapUv:De&&m(i.specularColorMap.channel),specularIntensityMapUv:Oe&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:Me&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||de),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(M||Me),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:A,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Fe,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&Vt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=vs[t];n=Ma.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Kl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Ql(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function $l(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function eu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||$l),r.length>1&&r.sort(t||eu),i.length>1&&i.sort(t||eu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function nu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new tu,e.set(t,[i])):n>=r.length?(i=new tu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ru(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new G};break;case`SpotLight`:n={position:new H,direction:new H,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function iu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new V,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var au=0;function ou(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function su(e){let t=new ru,n=iu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new W,o=new W;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ou);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=au++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function cu(e){let t=new su(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function lu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new cu(e),t.set(n,[a])):r>=i.length?(a=new cu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var uu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,du=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fu=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],pu=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],mu=new W,hu=new H,gu=new H;function _u(e,t,n){let r=new Qi,a=new V,o=new V,c=new Qt,l=new za,u=new Ba,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Fa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new V},radius:{value:4}},vertexShader:uu,fragmentShader:du}),v=m.clone();v.defines.HORIZONTAL_PASS=1;let y=new Nr;y.setAttribute(`position`,new vr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Si(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){z(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/y.x),a.x=o.x*y.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/y.y),a.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new en(a.x,a.y,{format:k,type:_,minFilter:s,magFilter:s,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Sa(a.x,a.y,g),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=E,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i}else d.isPointLight?(p.map=new Js(a.x),p.map.depthTexture=new Ca(a.x,h)):(p.map=new en(a.x,a.y),p.map.depthTexture=new Sa(a.x,a.y,h)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=E,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),hu.setFromMatrixPosition(d.matrixWorld),e.position.copy(hu),gu.copy(e.position),gu.add(fu[t]),e.up.copy(pu[t]),e.lookAt(gu),e.updateMatrixWorld(),n.makeTranslation(-hu.x,-hu.y,-hu.z),mu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(mu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(c)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new en(a.x,a.y,{format:k,type:_}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function vu(e,t){function n(){let t=!1,n=new Qt,r=null,i=new Qt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=at[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,j=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),ne=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(M)[1]),ne=j>=1);let N=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Qt().fromArray(ie),se=new Qt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),P(e.CULL_FACE),ge(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ue(e.BLEND),g=!1);return}if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(me[n],me[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ye(t){t===0?ue(e.CULL_FACE):(P(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function be(t){t!==ee&&(ne&&e.lineWidth(t),ee=t)}function xe(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?P(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+A-1),N!==t&&(e.activeTexture(t),N=t)}function we(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+A-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Te(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function I(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Le(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function L(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function R(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:F,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:L,uniformBlockBinding:R,texStorage2D:Me,texStorage3D:Ne,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:I,viewport:Le,reset:Re}}function yu(e,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new V,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Qe(`canvas`)}function T(e,t,n){let r=1,i=Fe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function O(t){e.generateMipmap(t)}function ee(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(t,n,r,i,a,o=!1){if(t!==null){if(e[t]!==void 0)return e[t];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+t+`'`)}let s;i&&(s=u.get(`EXT_texture_norm16`),s||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=n;if(n===e.RED&&(r===e.FLOAT&&(c=e.R32F),r===e.HALF_FLOAT&&(c=e.R16F),r===e.UNSIGNED_BYTE&&(c=e.R8),r===e.UNSIGNED_SHORT&&s&&(c=s.R16_EXT),r===e.SHORT&&s&&(c=s.R16_SNORM_EXT)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.R8UI),r===e.UNSIGNED_SHORT&&(c=e.R16UI),r===e.UNSIGNED_INT&&(c=e.R32UI),r===e.BYTE&&(c=e.R8I),r===e.SHORT&&(c=e.R16I),r===e.INT&&(c=e.R32I)),n===e.RG&&(r===e.FLOAT&&(c=e.RG32F),r===e.HALF_FLOAT&&(c=e.RG16F),r===e.UNSIGNED_BYTE&&(c=e.RG8),r===e.UNSIGNED_SHORT&&s&&(c=s.RG16_EXT),r===e.SHORT&&s&&(c=s.RG16_SNORM_EXT)),n===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RG8UI),r===e.UNSIGNED_SHORT&&(c=e.RG16UI),r===e.UNSIGNED_INT&&(c=e.RG32UI),r===e.BYTE&&(c=e.RG8I),r===e.SHORT&&(c=e.RG16I),r===e.INT&&(c=e.RG32I)),n===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGB8UI),r===e.UNSIGNED_SHORT&&(c=e.RGB16UI),r===e.UNSIGNED_INT&&(c=e.RGB32UI),r===e.BYTE&&(c=e.RGB8I),r===e.SHORT&&(c=e.RGB16I),r===e.INT&&(c=e.RGB32I)),n===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),r===e.UNSIGNED_INT&&(c=e.RGBA32UI),r===e.BYTE&&(c=e.RGBA8I),r===e.SHORT&&(c=e.RGBA16I),r===e.INT&&(c=e.RGBA32I)),n===e.RGB&&(r===e.UNSIGNED_SHORT&&s&&(c=s.RGB16_EXT),r===e.SHORT&&s&&(c=s.RGB16_SNORM_EXT),r===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),n===e.RGBA){let t=o?Ge:Vt.getTransfer(a);r===e.FLOAT&&(c=e.RGBA32F),r===e.HALF_FLOAT&&(c=e.RGBA16F),r===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT&&s&&(c=s.RGBA16_EXT),r===e.SHORT&&s&&(c=s.RGBA16_SNORM_EXT),r===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&u.get(`EXT_color_buffer_float`),c}function te(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function A(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),M(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),re(t)}function M(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&N(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function N(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function re(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let ie=0;function ae(){ie=0}function oe(){return ie}function se(e){ie=e}function ce(){let e=ie;return e>=p.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),ie+=1,e}function le(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,n){let r=f.get(t);if(t.isVideoTexture&&F(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{be(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function ue(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){be(r,t,n);return}t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function de(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){be(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version){xe(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let pe={[t]:e.REPEAT,[n]:e.CLAMP_TO_EDGE,[r]:e.MIRRORED_REPEAT},me={[i]:e.NEAREST,[a]:e.NEAREST_MIPMAP_NEAREST,[o]:e.NEAREST_MIPMAP_LINEAR,[s]:e.LINEAR,[c]:e.LINEAR_MIPMAP_NEAREST,[l]:e.LINEAR_MIPMAP_LINEAR},he={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ge(t,n){if(n.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(n.magFilter===1006||n.magFilter===1007||n.magFilter===1005||n.magFilter===1008||n.minFilter===1006||n.minFilter===1007||n.minFilter===1005||n.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(t,e.TEXTURE_WRAP_S,pe[n.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,pe[n.wrapT]),(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)&&e.texParameteri(t,e.TEXTURE_WRAP_R,pe[n.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,me[n.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,me[n.minFilter]),n.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,he[n.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(n.magFilter===1003||n.minFilter!==1005&&n.minFilter!==1008||n.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(n.anisotropy>1||f.get(n).__currentAnisotropy){let r=u.get(`EXT_texture_filter_anisotropic`);e.texParameterf(t,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,p.getMaxAnisotropy())),f.get(n).__currentAnisotropy=n.anisotropy}}}function _e(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,ne));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=le(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ve(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ye(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=ve(r.start,n.width,4),c=ve(t.start,n.width,4);r.start<=i+1&&s===c&&ve(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function be(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=_e(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Vt.getPrimaries(Vt.workingColorSpace),r=n.colorSpace===``?null:Vt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=Pe(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=k(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);ge(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=A(n,t);if(n.isDepthTexture)u=te(n.format===D,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&ye(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=ms(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=ms(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Fe(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Fe(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&O(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function xe(t,n,r){if(n.image.length!==6)return;let i=_e(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Vt.getPrimaries(Vt.workingColorSpace),s=n.colorSpace===``?null:Vt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Pe(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=k(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=A(n,h);ge(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Fe(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&O(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Se(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=k(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Me(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=te(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ne(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Ne(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Me(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Me(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function we(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,ne)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else P(n.depthTexture,0);let o=a.__webglTexture,s=Me(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Ne(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Te(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)we(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?we(n.__webglFramebuffer[0],t,0):we(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),Ce(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),Ce(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){let i=f.get(t);n!==void 0&&Se(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Te(t)}function De(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,j);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Ne(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=k(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ge(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)Se(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else Se(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&O(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),ge(s,i),Se(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&O(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ge(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)Se(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else Se(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&O(a),d.unbindTexture()}t.depthBuffer&&Te(t)}function Oe(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let ke=[],Ae=[];function je(t){if(t.samples>0){if(Ne(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(ke.length=0,Ae.length=0,ke.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ke.push(o),Ae.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ae)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ke))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Me(e){return Math.min(p.maxSamples,e.samples)}function Ne(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function F(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Pe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Vt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Fe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ce,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=se,this.setTexture2D=P,this.setTexture2DArray=ue,this.setTexture3D=de,this.setTextureCube=fe,this.rebindTextures=Ee,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=Ne,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function bu(e,t){function n(n,r=``){let i,a=Vt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var xu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Su=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Cu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new wa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Fa({vertexShader:xu,fragmentShader:Su,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Si(new Ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wu=class extends ot{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,_=new Cu,v={},y=t.getContextAttributes(),x=null,S=null,C=[],w=[],O=new V,ee=null,k=null,te=new Fo;te.viewport=new Qt;let A=new Fo;A.viewport=new Qt;let ne=[te,A],j=new Yo,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getHandSpace()};function re(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ie(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,ie),r.removeEventListener(`inputsourceschange`,ae);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}M=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(O.width,O.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,ie),r.addEventListener(`inputsourceschange`,ae),y.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?D:E,a=y.stencil?b:h);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new en(f.textureWidth,f.textureHeight,{format:T,type:u,depthTexture:new Sa(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new en(p.framebufferWidth,p.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let oe=new H,se=new H;function ce(e,t,n){oe.setFromMatrixPosition(t.matrixWorld),se.setFromMatrixPosition(n.matrixWorld);let r=oe.distanceTo(se),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=A.near=te.near=t,j.far=A.far=te.far=n,(M!==j.near||N!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,N=j.far),j.layers.mask=e.layers.mask|6,te.layers.mask=j.layers.mask&-5,A.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;le(j,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?ce(j,te,A):j.projectionMatrix.copy(te.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),P(e,j,i)};function P(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ut*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let ue=null;function de(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ne[n];o===void 0&&(o=new Fo,o.layers.enable(n),o.viewport=new Qt,ne[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new wa,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ue&&ue(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let fe=new gs;fe.setAnimationLoop(de),this.setAnimationLoop=function(e){ue=e},this.dispose=function(){}}},Tu=new W,Eu=new U;Eu.set(-1,0,0,0,1,0,0,0,1);function Du(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ja(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Tu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Eu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ou(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ku=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Au=null;function ju(){return Au===null&&(Au=new Ii(ku,16,16,k,_),Au.name=`DFG_LUT`,Au.minFilter=s,Au.magFilter=s,Au.wrapS=n,Au.wrapT=n,Au.generateMipmaps=!1,Au.needsUpdate=!0),Au}var Mu=class{constructor(e={}){let{canvas:t=$e(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:g=u}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=g,C=new Set([A,te,ee]),w=new Set([u,h,p,b,v,y]),T=new Uint32Array(4),E=new Int32Array(4),D=new H,O=null,k=null,ne=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,re=!1,ie=null,ae=null,oe=null,se=null;this._outputColorSpace=Ue;let ce=0,le=0,P=null,ue=-1,de=null,fe=new Qt,pe=new Qt,me=null,he=new G(0),ge=0,_e=t.width,ve=t.height,ye=1,be=null,xe=null,Se=new Qt(0,0,_e,ve),Ce=new Qt(0,0,_e,ve),we=!1,Te=new Qi,Ee=!1,De=!1,Oe=new W,ke=new H,Ae=new Qt,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Me=!1;function Ne(){return P===null?ye:1}let F=n;function Pe(e,n){return t.getContext(e,n)}let Fe,Ie,I,Le,L,R,Re,ze,Be,Ve,He,We,Ge,Ke,qe,Je,Xe,Ze,Qe,et,nt,rt,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ct,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),F===null){let t=`webgl2`;if(F=Pe(t,e),F===null)throw Pe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ot()}catch(e){throw t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),B(`WebGLRenderer: `+e.message),e}function ot(){Fe=new Xs(F),Fe.init(),nt=new bu(F,Fe),Ie=new Ts(F,Fe,e,nt),I=new vu(F,Fe),Ie.reversedDepthBuffer&&m&&I.buffers.depth.setReversed(!0),ae=F.createFramebuffer(),oe=F.createFramebuffer(),se=F.createFramebuffer(),Le=new $s(F),L=new Ql,R=new yu(F,Fe,I,L,Ie,nt,Le),Re=new Ys(N),ze=new _s(F),rt=new Cs(F,ze),Be=new Zs(F,ze,Le,rt),Ve=new tc(F,Be,ze,rt,Le),Ze=new ec(F,Ie,R),qe=new Es(L),He=new Zl(N,Re,Fe,Ie,rt,qe),We=new Du(N,L),Ge=new nu,Ke=new lu(Fe),Xe=new Ss(N,Re,I,Ve,x,s),Je=new _u(N,Ve,Ie),at=new Ou(F,Le,Ie,I),Qe=new ws(F,Fe,Le),et=new Qs(F,Fe,Le),Le.programs=He.programs,N.capabilities=Ie,N.extensions=Fe,N.properties=L,N.renderLists=Ge,N.shadowMap=Je,N.state=I,N.info=Le}S!==1009&&(M=new rc(S,t.width,t.height,o,r,i));let st=new wu(N,F);this.xr=st,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Fe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(e){e!==void 0&&(ye=e,this.setSize(_e,ve,!1))},this.getSize=function(e){return e.set(_e,ve)},this.setSize=function(e,n,r=!0){if(st.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}_e=e,ve=n,t.width=Math.floor(e*ye),t.height=Math.floor(n*ye),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(_e*ye,ve*ye).floor()},this.setDrawingBufferSize=function(e,n,r){_e=e,ve=n,ye=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(fe)},this.getViewport=function(e){return e.copy(Se)},this.setViewport=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),I.viewport(fe.copy(Se).multiplyScalar(ye).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),I.scissor(pe.copy(Ce).multiplyScalar(ye).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(e){I.setScissorTest(we=e)},this.setOpaqueSort=function(e){be=e},this.setTransparentSort=function(e){xe=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=C.has(t)}if(e){let e=P.texture.type,t=w.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,F.clearBufferuiv(F.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,F.clearBufferiv(F.COLOR,0,E))}else r|=F.COLOR_BUFFER_BIT}t&&(r|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&F.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ie=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Xe.dispose(),Ge.dispose(),Ke.dispose(),L.dispose(),Re.dispose(),Ve.dispose(),rt.dispose(),at.dispose(),He.dispose(),st.dispose(),st.removeEventListener(`sessionstart`,_t),st.removeEventListener(`sessionend`,vt),yt.stop()};function ct(e){e.preventDefault(),tt(`WebGLRenderer: Context Lost.`),re=!0}function lt(){tt(`WebGLRenderer: Context Restored.`),re=!1;let e=Le.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;ot(),Le.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ut(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),ft(t)}function ft(e){pt(e),L.remove(e)}function pt(e){let t=L.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=je);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=kt(e,t,n,r,i);I.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=Qe;if(c!==null&&(h=ze.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(I.setLineWidth(r.wireframeLinewidth*Ne()),g.setMode(F.LINES)):g.setMode(F.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),I.setLineWidth(e*Ne()),i.isLineSegments?g.setMode(F.LINES):i.isLineLoop?g.setMode(F.LINE_LOOP):g.setMode(F.LINE_STRIP)}else i.isPoints?g.setMode(F.POINTS):i.isSprite&&g.setMode(F.TRIANGLES);if(i.isBatchedMesh){if(Fe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=L.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(F,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n,r){ie!==null&&e.isNodeMaterial&&ie.setObject(r,e),Ee===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Tt(e,t,r),e.side=0,e.needsUpdate=!0,Tt(e,t,r),e.side=2):Tt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ie!==null&&ie.renderStart(e,t,n),k=Ke.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),ie!==null&&ie.updateLights(k.state.lightsArray),De=this.localClippingEnabled,Ee=qe.init(this.clippingPlanes,De),Ee===!0&&qe.setGlobalState(this.clippingPlanes,t),ie!==null&&Je.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];mt(o,n,t,e),r.add(o)}else mt(i,n,t,e),r.add(i)}}),k=j.pop(),ie!==null&&ie.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=L.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Fe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ht=null;function gt(e){ht&&ht(e)}function _t(){yt.stop()}function vt(){yt.start()}let yt=new gs;yt.setAnimationLoop(gt),typeof self<`u`&&yt.setContext(self),this.setAnimationLoop=function(e){ht=e,st.setAnimationLoop(e),e===null?yt.stop():yt.start()},st.addEventListener(`sessionstart`,_t),st.addEventListener(`sessionend`,vt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;ie!==null&&ie.renderStart(e,t);let n=st.enabled===!0&&st.isPresenting===!0,r=M!==null&&(P===null||n)&&M.begin(N,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(t),t=st.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,P),k=Ke.get(e,j.length),k.init(t),k.state.textureUnits=R.getTextureUnits(),j.push(k),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Te.setFromProjectionMatrix(Oe,Ye,t.reversedDepth),De=this.localClippingEnabled,Ee=qe.init(this.clippingPlanes,De),O=Ge.get(e,ne.length),O.init(),ne.push(O),st.enabled===!0&&st.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,N.sortObjects)}bt(e,t,0,N.sortObjects),O.finish(),ie!==null&&ie.updateLights(k.state.lightsArray),N.sortObjects===!0&&O.sort(be,xe),Me=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Me&&Xe.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ee===!0&&qe.beginShadows();let i=k.state.shadowsArray;if(Je.render(i,e,t),Ee===!0&&qe.endShadows(),(r&&M.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}Me&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(O,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),Me&&Xe.render(e),xt(O,e,t)}P!==null&&le===0&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),rt.resetDefaultState(),ue=-1,de=null,j.pop(),j.length>0?(k=j[j.length-1],R.setTextureUnits(k.state.textureUnits),Ee===!0&&qe.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,ne.pop(),O=ne.length>0?ne[ne.length-1]:null,ie!==null&&ie.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Te)){r&&Ae.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=Ve.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Te))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ae.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ae.copy(e.boundingSphere.center)),Ae.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Ae.z,s,t)}}else a.visible&&O.push(e,i,a,n,Ae.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Ee===!0&&qe.setGlobalState(N.clippingPlanes,n),r&&I.viewport(fe.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Fe.has(`EXT_color_buffer_half_float`)||Fe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new en(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,Ie.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Vt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||fe;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),d=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(he),ge=N.getClearAlpha(),ge<1&&N.setClearColor(16777215,.5),N.clear(),Me&&Xe.render(n);let f=N.toneMapping;N.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Ee===!0&&qe.setGlobalState(N.clippingPlanes,r),Ct(e,n,r),R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a),Fe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(R.updateMultisampleRenderTarget(a),R.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,d),N.setClearColor(he,ge),p!==void 0&&(r.viewport=p),N.toneMapping=f}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){ie!==null&&i.isNodeMaterial&&ie.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function Tt(e,t,n){t.isScene!==!0&&(t=je);let r=L.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Dt(e,s),d}else s.uniforms=He.getUniforms(e),ie!==null&&e.isNodeMaterial&&ie.build(e,n,s),e.onBeforeCompile(s,N),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Dt(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Et(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ul.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Dt(e,t){let n=L.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ot(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function kt(e,t,n,r,i){t.isScene!==!0&&(t=je),R.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?N.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Vt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=L.get(r),y=k.state.lights;if(Ee===!0&&(De===!0||e!==de)){let t=e===de&&r.id===ue;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Tt(r,t,i),ie&&r.isNodeMaterial&&ie.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(I.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ue&&(ue=r.id,C=!0),v.needsLights){let e=Ot(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||de!==e){I.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(F,`projectionMatrix`,e.projectionMatrix),T.setValue(F,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(F,ke.setFromMatrixPosition(e.matrixWorld)),Ie.logarithmicDepthBuffer&&T.setValue(F,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(F,`isOrthographic`,e.isOrthographicCamera===!0),de!==e&&(de=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(F,`sunShadowMap`,y.state.sunShadowMap,R),y.state.directionalShadowMap.length>0&&T.setValue(F,`directionalShadowMap`,y.state.directionalShadowMap,R),y.state.spotShadowMap.length>0&&T.setValue(F,`spotShadowMap`,y.state.spotShadowMap,R),y.state.pointShadowMap.length>0&&T.setValue(F,`pointShadowMap`,y.state.pointShadowMap,R)),i.isSkinnedMesh){T.setOptional(F,i,`bindMatrix`),T.setOptional(F,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(F,`boneTexture`,e.boneTexture,R))}i.isBatchedMesh&&(T.setOptional(F,i,`batchingTexture`),T.setValue(F,`batchingTexture`,i._matricesTexture,R),T.setOptional(F,i,`batchingIdTexture`),T.setValue(F,`batchingIdTexture`,i._indirectTexture,R),T.setOptional(F,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(F,`batchingColorTexture`,i._colorsTexture,R));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Ze.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(F,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=ju()),C){if(T.setValue(F,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&At(E,w),a&&r.fog===!0&&We.refreshFogUniforms(E,a),We.refreshMaterialUniforms(E,r,ye,ve,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}ul.upload(F,Et(v),E,R)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ul.upload(F,Et(v),E,R),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(F,`center`,i.center),T.setValue(F,`modelViewMatrix`,i.modelViewMatrix),T.setValue(F,`normalMatrix`,i.normalMatrix),T.setValue(F,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,x),at.bind(n,x)}}return x}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return le},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=L.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),L.get(e.texture).__webglTexture=t,L.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=L.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ce=t,le=n;let r=null,i=!1,a=!1;if(e){let o=L.get(e);if(o.__useDefaultFramebuffer!==void 0){I.bindFramebuffer(F.FRAMEBUFFER,o.__webglFramebuffer),fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest,I.viewport(fe),I.scissor(pe),I.setScissorTest(me),ue=-1;return}if(o.__webglFramebuffer===void 0)R.setupRenderTarget(e);else if(o.__hasExternalTextures)R.rebindTextures(e,L.get(e.texture).__webglTexture,L.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&L.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);R.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=L.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&R.useMultisampledRTT(e)===!1?L.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,fe.copy(e.viewport),pe.copy(e.scissor),me=e.scissorTest}else fe.copy(Se).multiplyScalar(ye).floor(),pe.copy(Ce).multiplyScalar(ye).floor(),me=we;if(n!==0&&(r=ae),I.bindFramebuffer(F.FRAMEBUFFER,r)&&I.drawBuffers(e,r),I.viewport(fe),I.scissor(pe),I.setScissorTest(me),i){let r=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=L.get(e.textures[t]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=L.get(e.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,t.__webglTexture,n)}ue=-1};function Mt(e){let t=L.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ie.textureFormatReadable(e.format),t.__typeReadable=Ie.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){I.bindFramebuffer(F.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let u=Mt(o);if(u.__formatReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&F.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=L.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){I.bindFramebuffer(F.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.bufferData(F.PIXEL_PACK_BUFFER,a.byteLength,F.STREAM_READ),F.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let p=P===null?null:L.get(P).__webglFramebuffer;I.bindFramebuffer(F.FRAMEBUFFER,p);let m=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await it(F,m,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,f),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,a),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(f),F.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;R.setTexture2D(e,0),F.copyTexSubImage2D(F.TEXTURE_2D,n,0,0,o,s,i,a),I.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(R.setTexture3D(t,0),v=F.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(R.setTexture2DArray(t,0),v=F.TEXTURE_2D_ARRAY):(R.setTexture2D(t,0),v=F.TEXTURE_2D),I.activeTexture(F.TEXTURE0),I.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,t.flipY),I.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),I.pixelStorei(F.UNPACK_ALIGNMENT,t.unpackAlignment);let y=I.getParameter(F.UNPACK_ROW_LENGTH),b=I.getParameter(F.UNPACK_IMAGE_HEIGHT),x=I.getParameter(F.UNPACK_SKIP_PIXELS),S=I.getParameter(F.UNPACK_SKIP_ROWS),C=I.getParameter(F.UNPACK_SKIP_IMAGES);I.pixelStorei(F.UNPACK_ROW_LENGTH,h.width),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,h.height),I.pixelStorei(F.UNPACK_SKIP_PIXELS,l),I.pixelStorei(F.UNPACK_SKIP_ROWS,u),I.pixelStorei(F.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=L.get(e),r=L.get(t),h=L.get(n.__renderTarget),g=L.get(r.__renderTarget);I.bindFramebuffer(F.READ_FRAMEBUFFER,h.__webglFramebuffer),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(e).__webglTexture,i,d+n),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,L.get(t).__webglTexture,a,m+n)),F.blitFramebuffer(l,u,o,s,f,p,o,s,F.DEPTH_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||L.has(e)){let n=L.get(e),r=L.get(t);I.bindFramebuffer(F.READ_FRAMEBUFFER,oe),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,se);for(let e=0;e<c;e++)w?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,n.__webglTexture,i),T?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,r.__webglTexture,a),i===0?T?F.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):F.copyTexSubImage2D(v,a,f,p,l,u,o,s):F.blitFramebuffer(l,u,o,s,f,p,o,s,F.COLOR_BUFFER_BIT,F.NEAREST);I.bindFramebuffer(F.READ_FRAMEBUFFER,null),I.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?F.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):F.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):F.texSubImage2D(F.TEXTURE_2D,a,f,p,o,s,g,_,h);I.pixelStorei(F.UNPACK_ROW_LENGTH,y),I.pixelStorei(F.UNPACK_IMAGE_HEIGHT,b),I.pixelStorei(F.UNPACK_SKIP_PIXELS,x),I.pixelStorei(F.UNPACK_SKIP_ROWS,S),I.pixelStorei(F.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&F.generateMipmap(v),I.unbindTexture()},this.initRenderTarget=function(e){L.get(e).__webglFramebuffer===void 0&&R.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?R.setTextureCube(e,0):e.isData3DTexture?R.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?R.setTexture2DArray(e,0):R.setTexture2D(e,0),I.unbindTexture()},this.resetState=function(){ce=0,le=0,P=null,I.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ye}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Vt._getUnpackColorSpace()}},Nu=class{keys=new Set;pressed=new Set;mouseDX=0;mouseDY=0;locked=!1;enabled=!0;raw=!1;canvas;onLockChange;constructor(e){this.canvas=e,window.addEventListener(`keydown`,e=>{if(!this.enabled)return;let t=e.target;(!t||t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`)&&(this.keys.has(e.code)||this.pressed.add(e.code),this.keys.add(e.code),[`Space`,`Tab`,`ArrowUp`,`ArrowDown`].includes(e.code)&&this.locked&&e.preventDefault())}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.keys.clear()),window.addEventListener(`mousemove`,e=>{this.locked&&(this.mouseDX+=e.movementX,this.mouseDY+=e.movementY)}),window.addEventListener(`mousedown`,e=>{this.locked&&this.pressed.add(`Mouse`+e.button)}),document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===this.canvas,this.locked||this.keys.clear(),this.onLockChange?.(this.locked)})}lock(){let e=this.canvas;try{let t=e.requestPointerLock(this.raw?{unadjustedMovement:!0}:void 0);t&&typeof t.catch==`function`&&t.catch(()=>e.requestPointerLock())}catch{e.requestPointerLock()}}unlock(){document.pointerLockElement&&document.exitPointerLock()}down(e){return this.enabled&&this.keys.has(e)}hit(e){return this.enabled&&this.pressed.has(e)}pad(){let e=navigator.getGamepads?.().find(e=>e&&e.connected);if(!e)return null;let t=e=>Math.abs(e)<.15?0:e;return{mx:t(e.axes[0]),mz:t(e.axes[1]),lx:t(e.axes[2]??0),ly:t(e.axes[3]??0),sprint:!!e.buttons[10]?.pressed||!!e.buttons[4]?.pressed,crouch:!!e.buttons[1]?.pressed,flash:!!e.buttons[3]?.pressed,use:!!e.buttons[0]?.pressed}}endFrame(){this.pressed.clear(),this.mouseDX=0,this.mouseDY=0}},Pu={name:``,sensitivity:1,fov:78,invertY:!1,quality:`auto`,vhs:.1,grain:.12,motionBlur:.45,headBob:.6,master:.9,sfx:1,ambience:1,voice:1,micMode:`ptt`,chat:!0,profanityFilter:!0,showFps:!1,rawInput:!1,reduceFlashes:!1};function Fu(e,t){try{let n=localStorage.getItem(e);return n?{...t,...JSON.parse(n)}:t}catch{return t}}function Iu(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var Lu=[`Lost`,`Damp`,`Quiet`,`Humming`,`Yellow`,`Pale`,`Wandering`,`Static`,`Hollow`,`Flickering`],Ru=[`Wanderer`,`Tenant`,`Moth`,`Clerk`,`Signal`,`Drifter`,`Janitor`,`Echo`,`Visitor`,`Surveyor`],J=Fu(`ob.settings2`,Pu);J.name||=Fu(`ob.settings`,{}).name??``,J.name||=Lu[Math.floor(Math.random()*Lu.length)]+Ru[Math.floor(Math.random()*Ru.length)]+Math.floor(Math.random()*90+10);function zu(){Iu(`ob.settings2`,J)}var Y=Fu(`ob.profile`,{coins:25,totalEarned:0,escapes:0,deaths:0,bestTime:0,locker:{},inventory:{almond:1},owned:[`hoodie_olive`,`torch_basic`],outfit:`hoodie_olive`,flashlight:`torch_basic`});function Bu(){Iu(`ob.profile`,Y)}var Vu=null;function Hu(e){Vu=e}function Uu(e,t){e=Math.round(e),!(e<=0)&&(Y.coins+=e,Y.totalEarned+=e,Bu(),Vu?.(e,t))}function Wu(e){return Y.coins<e?!1:(Y.coins-=e,Bu(),Vu?.(-e,``),!0)}var Gu={low:{scale:.7,lights:3,shadows:!1,shadowSize:512,blurSamples:0,radius:1,tier:`lo`,aniso:4,bloom:.07,pixelRatioCap:1,msaa:0,ssao:!1},medium:{scale:.75,lights:5,shadows:!0,shadowSize:1024,blurSamples:6,radius:2,tier:`hi`,aniso:8,bloom:.08,pixelRatioCap:1.5,msaa:0,ssao:!0},high:{scale:.85,lights:8,shadows:!0,shadowSize:1024,blurSamples:8,radius:2,tier:`hi`,aniso:16,bloom:.08,pixelRatioCap:2,msaa:4,ssao:!0},ultra:{scale:1,lights:12,shadows:!0,shadowSize:2048,blurSamples:12,radius:3,tier:`hi`,aniso:16,bloom:.08,pixelRatioCap:2,msaa:4,ssao:!0}};function Ku(e){let t=``;try{let n=e.getExtension(`WEBGL_debug_renderer_info`);t=String(n?e.getParameter(n.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER)).toLowerCase()}catch{}return/swiftshader|llvmpipe|software|basic render/.test(t)?`low`:/apple m[1-9]|apple gpu|rtx|radeon rx|geforce gtx 1[06-9]|geforce gtx 2|arc a7/.test(t)?`high`:/apple|m1|radeon|geforce|nvidia/.test(t)?`medium`:/intel|uhd|iris|mali|adreno|powervr/.test(t)?`low`:`medium`}var qu=class{max;min;acc=0;n=0;scale;constructor(e,t=.5){this.max=e,this.min=t,this.scale=e}sample(e){if(this.acc+=e,this.n++,this.acc<1.5)return!1;let t=this.acc/this.n;this.acc=0,this.n=0;let n=this.scale;return t>1/45?this.scale=Math.max(this.min,this.scale-.08):t<1/58&&this.scale<this.max&&(this.scale=Math.min(this.max,this.scale+.04)),Math.abs(n-this.scale)>.001}};function Ju(...e){let t=-2128831035;for(let n=0;n<e.length;n++){let r=e[n]|0;r=Math.imul(r,3432918353),r=r<<15|r>>>17,r=Math.imul(r,461845907),t^=r,t=t<<13|t>>>19,t=Math.imul(t,5)+3864292196|0}return t^=e.length,t^=t>>>16,t=Math.imul(t,2246822507),t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,t>>>0}function Yu(...e){return Ju(...e)/4294967296}function Xu(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}var Zu=class{s;constructor(e){this.s=e>>>0}next(){let e=this.s=this.s+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return Math.floor(this.range(e,t+1))}pick(e){return e[Math.floor(this.next()*e.length)]}chance(e){return this.next()<e}shuffle(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(this.next()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}};function Qu(e){return e*e*(3-2*e)}function $u(e,t,n){let r=Math.floor(t),i=Math.floor(n),a=Qu(t-r),o=Qu(n-i),s=Yu(e,r,i),c=Yu(e,r+1,i),l=Yu(e,r,i+1),u=Yu(e,r+1,i+1);return s+(c-s)*a+(l-s)*o+(s-c-l+u)*a*o}function ed(e,t,n,r=3){let i=.5,a=0,o=0,s=1;for(let c=0;c<r;c++)a+=i*$u(e+c*101,t*s,n*s),o+=i,i*=.5,s*=2;return a/o}var td=(e,t,n)=>e<t?t:e>n?n:e,nd=(e,t,n)=>e+(t-e)*n,rd=(e,t)=>1-Math.exp(-e*t),id=[{id:0,key:`l0`,name:`Level 0`,subtitle:`The Lobby`,cell:2.4384,height:2.7432,wallThick:.12,tile:.6096,openness:[.52,.88,.14],zoneScale:14,darkZone:.7,wetZone:.68,rooms:[1,3],enclosedRooms:1,pillarChance:.25,pillarSize:.42,lightPattern:[2,1],fixture:`troffer`,lightIntensity:1,lightColor:[1,.94,.76],accentColor:[1,.85,.55],accentChance:0,flickerChance:.05,deadChance:.06,ambient:.015,bounceColor:[.62,.5,.24],fogColor:[.62,.55,.3],fogDensity:.026,exposure:.92,grade:{tint:[1.06,1,.8],saturation:1.14,contrast:1.08,lift:.004},tex:{wall:`l0_wallpaper`,floor:`l0_carpet`,ceil:`l0_ceiling`,wallScale:1,floorScale:.5,wallTint:[1,1,1]},surface:`carpet`,audio:{amb:`amb_l0`,ir:`ir_l0`},entities:[`howler`,`smiler`],exit:`door`,exitDistance:[200,320],outletChance:.2,almondChance:.012},{id:1,key:`l1`,name:`Level 1`,subtitle:`Habitable Zone`,cell:4,height:4.4,wallThick:.3,tile:0,openness:[.62,.95,.3],zoneScale:10,darkZone:.7,wetZone:.55,rooms:[1,2],enclosedRooms:0,pillarChance:.55,pillarSize:.6,lightPattern:[2,2],fixture:`highbay`,lightIntensity:2.6,lightColor:[.86,.96,1],accentColor:[1,.56,.2],accentChance:.22,flickerChance:.08,deadChance:.18,ambient:.01,bounceColor:[.36,.37,.37],fogColor:[.42,.46,.48],fogDensity:.04,exposure:1.05,grade:{tint:[.95,1,1.03],saturation:.8,contrast:1.1,lift:.01},tex:{wall:`l1_wall`,floor:`l1_floor`,wallScale:2.4,floorScale:2,wallTint:[1,1,1]},surface:`concrete`,audio:{amb:`amb_l1`,ir:`ir_l1`},entities:[`hound`,`hound`,`smiler`,`faceling`,`faceling`,`skinstealer`],exit:`hatch`,exitDistance:[220,340],outletChance:.12,almondChance:.03},{id:2,key:`l2`,name:`Level 2`,subtitle:`Pipe Dreams`,cell:1.6,height:2.35,wallThick:.2,tile:0,openness:[.22,.5,.06],zoneScale:12,darkZone:.6,wetZone:.6,rooms:[0,1],enclosedRooms:0,pillarChance:0,pillarSize:.3,lightPattern:[2,2],fixture:`caged`,lightIntensity:1.1,lightColor:[1,.74,.48],accentColor:[.55,.05,.03],accentChance:.14,flickerChance:.15,deadChance:.2,ambient:.012,bounceColor:[.34,.26,.2],fogColor:[.28,.2,.16],fogDensity:.05,exposure:1.1,grade:{tint:[1.06,.97,.9],saturation:.85,contrast:1.12,lift:.008},tex:{wall:`l2_wall`,floor:`l2_floor`,wallScale:1.6,floorScale:1,wallTint:[1,1,1]},surface:`metal`,audio:{amb:`amb_l2`,ir:`ir_l2`},entities:[`hound`,`hound`,`hound`,`smiler`,`faceling`],exit:`elevator`,exitDistance:[160,260],outletChance:.05,almondChance:.02}],ad={gx0:-2,gx1:2,gz0:-2,gz1:2},od=(e,t,n)=>e===0&&t>=ad.gx0&&t<=ad.gx1&&n>=ad.gz0&&n<=ad.gz1,X=16,sd=(e,t)=>(e%t+t)%t;function cd(e,t,n,r){let i=t.zoneScale;if(Math.abs(n)<5&&Math.abs(r)<5)return 0;if(ed(e^20899,n/(i*.8),r/(i*.8),3)>t.darkZone)return 3;let a=ed(e^11132,n/i,r/i,3);return a>.64?1:a<.34?2:ed(e^30689,n/(i*.6),r/(i*.6),2)>t.wetZone?4:0}function ld(e,t){let n=Yu(e,t.id,991)*Math.PI*2,r=t.exitDistance[0]+Yu(e,t.id,992)*(t.exitDistance[1]-t.exitDistance[0]);return{gx:Math.round(Math.cos(n)*r/t.cell),gz:Math.round(Math.sin(n)*r/t.cell)}}function ud(e,t){let n=e.cell;return{x:(.5+t%3)*n,z:.5*n}}function dd(e,t,n,r){let i=id[t],a=new Zu(Ju(e,t,n,r,12648430)),o=n*X,s=r*X,c=(e,t)=>t*X+e,l=new Uint8Array(X*X);for(let t=0;t<X;t++)for(let n=0;n<X;n++)l[c(n,t)]=cd(e,i,o+n,s+t);let u=new Uint8Array(X*X).fill(1),d=new Uint8Array(X*X).fill(1),f=new Int32Array(X*X).map((e,t)=>t),p=e=>{for(;f[e]!==e;)f[e]=f[f[e]],e=f[e];return e},m=[];for(let e=0;e<X;e++)for(let t=0;t<X;t++)t>0&&m.push([0,t,e]),e>0&&m.push([1,t,e]);a.shuffle(m);let h=[];for(let e of m){let[t,n,r]=e,i=c(n,r),a=t===0?c(n-1,r):c(n,r-1),o=p(i),s=p(a);o===s?h.push(e):(f[o]=s,(t===0?d:u)[i]=0)}for(let[e,t,n]of h){let r=l[c(t,n)],o=r===1?i.openness[1]:r===2?i.openness[2]:i.openness[0];a.chance(o)&&((e===0?d:u)[c(t,n)]=0)}let g=a.int(i.rooms[0],i.rooms[1]);for(let e=0;e<g;e++){let e=a.int(3,7),t=a.int(3,7),n=a.int(1,X-e-1),r=a.int(1,X-t-1);for(let i=r;i<r+t;i++)for(let t=n;t<n+e;t++)t>n&&(d[c(t,i)]=0),i>r&&(u[c(t,i)]=0)}for(let e=0;e<i.enclosedRooms;e++){if(!a.chance(.6))continue;let e=a.int(2,4),t=a.int(2,4),n=a.int(1,X-e-1),r=a.int(1,X-t-1);for(let i=r;i<r+t;i++)for(let t=n;t<n+e;t++)t>n&&(d[c(t,i)]=0),i>r&&(u[c(t,i)]=0);for(let i=n;i<n+e;i++)u[c(i,r)]=1,u[c(i,r+t)]=1;for(let i=r;i<r+t;i++)d[c(n,i)]=1,d[c(n+e,i)]=1;u[c(a.int(n,n+e-1),a.chance(.5)?r:r+t)]=0,d[c(a.chance(.5)?n:n+e,a.int(r,r+t-1))]=0}let _=ld(e,i),v=null,y=_.gx-o,b=_.gz-s;if(y>=1&&y<X-2&&b>=1&&b<X-2){for(let e=b-1;e<=b+1;e++)for(let t=y-1;t<=y+1;t++)l[c(t,e)]=5,t>y-1&&(d[c(t,e)]=0),e>b-1&&(u[c(t,e)]=0);i.exit===`hatch`?v={gx:_.gx,gz:_.gz,x:(_.gx+.5)*i.cell,z:(_.gz+.5)*i.cell,rot:0}:(d[c(y-1,b)]=1,v={gx:_.gx,gz:_.gz,x:(_.gx-1)*i.cell+i.wallThick/2,z:(_.gz+.5)*i.cell,rot:Math.PI/2})}fd(u,d,a);let x=i=>new Zu(Ju(e,t,n,r,i,45278));for(let e of[0,1]){let t=x(e),n=new Set,r=t.int(2,5);for(;n.size<r;)n.add(t.int(0,X-1));for(let r=0;r<X;r++){let i=e===0?l[c(0,r)]:l[c(r,0)],a=i===1?.85:i===2?.15:.45,o=n.has(r)||t.chance(a);e===0?d[c(0,r)]=+!o:u[c(r,0)]=+!o}}if(t===0)for(let e=0;e<X;e++)for(let t=0;t<X;t++){let n=o+t,r=s+e,i=od(0,n,r);i&&(l[c(t,e)]=6);let a=od(0,n-1,r);(i||a)&&(d[c(t,e)]=i&&a||r===0?0:1);let f=od(0,n,r-1);(i||f)&&(u[c(t,e)]=i&&f||n===0?0:1)}let S=new Uint8Array(X*X);if(i.pillarChance>0)for(let e=1;e<X;e++)for(let t=1;t<X;t++){let n=l[c(t,e)];if(n!==1&&(i.id!==1||n===2))continue;let r=!d[c(t,e)]&&!d[c(t,e-1)]&&!u[c(t,e)]&&!u[c(t-1,e)],o=i.id!==1||t%2==0&&e%2==0;r&&o&&a.chance(i.pillarChance)&&(S[c(t,e)]=1)}let C={level:t,cx:n,cz:r,wallX:u,wallZ:d,zone:l,pillar:S,lights:[],props:[],decals:[],pickups:[],pipes:[],tiles:null,exit:v};return pd(C,i,e,a,_),C}function fd(e,t,n){let r=(e,t)=>t*X+e,i=new Uint8Array(X*X),a=()=>{i.fill(0);let n=[0];for(i[0]=1;n.length;){let a=n.pop(),o=a%X,s=a/X|0;o>0&&!t[r(o,s)]&&!i[a-1]&&(i[a-1]=1,n.push(a-1)),o<X-1&&!t[r(o+1,s)]&&!i[a+1]&&(i[a+1]=1,n.push(a+1)),s>0&&!e[r(o,s)]&&!i[a-X]&&(i[a-X]=1,n.push(a-X)),s<X-1&&!e[r(o,s+1)]&&!i[a+X]&&(i[a+X]=1,n.push(a+X))}};for(let o=0;o<400;o++){a();let o=[];for(let e=0;e<X;e++)for(let t=0;t<X;t++){let n=r(t,e);i[n]||(t>0&&i[n-1]&&o.push([0,n]),t<X-1&&i[n+1]&&o.push([0,n+1]),e>0&&i[n-X]&&o.push([1,n]),e<X-1&&i[n+X]&&o.push([1,n+X]))}if(!o.length)return;let[s,c]=n.pick(o);(s===0?t:e)[c]=0}}function pd(e,t,n,r,i){let a=t.cell,o=e.cx*X,s=e.cz*X,c=(e,t)=>t*X+e,l=t.height,u=t.wallThick,[d,f]=t.lightPattern;for(let n=0;n<X;n++)for(let i=0;i<X;i++){let l=o+i,u=s+n;if((l%d+d)%d!==0||(u%f+f)%f!==0)continue;let p=e.zone[c(i,n)],m=0,h=r.next();p===3?m=r.chance(.07)?1:2:h<t.deadChance?m=r.chance(t.id===0?.25:.1)?3:2:h<t.deadChance+t.flickerChance&&(m=1),(p===5||p===6||Math.abs(l)<4&&Math.abs(u)<4)&&(m=0);let g=t.accentChance>0&&r.chance(t.accentChance),_=(l+.5)*a,v=(u+.5)*a;t.fixture===`caged`&&(_+=r.range(-.3,.3),v+=r.range(-.3,.3)),e.lights.push({x:_,z:v,rot:0,state:m,accent:g,gx:l,gz:u})}if(t.tile>0){let i=Math.round(a/t.tile),u=X*i,d=new Uint8Array(u*u);for(let t=0;t<u*u;t++){let r=t%u,a=t/u|0,l=e.zone[c(r/i|0,a/i|0)],f=Yu(n,o*i+r,s*i+a,17),p=l===4?.22:.035,m=0;f<p*.25?m=3:f<p*.6?m=2:f<p&&(m=1),(f>.996||l===4&&f>.985||l===3&&f>.97)&&(m=4),d[t]=m}for(let n of e.lights){let e=Math.floor((n.x-o*a)/t.tile-.5),r=Math.floor((n.z-s*a)/t.tile-1);for(let t=0;t<2;t++)e>=0&&r+t>=0&&e<u&&r+t<u&&(d[(r+t)*u+e]=n.state===3?4:5);n.x=o*a+(e+.5)*t.tile,n.z=s*a+(r+1)*t.tile}for(let n=0;n<3;n++){let n=r.int(1,u-2),i=r.int(1,u-2);d[i*u+n]<4&&r.chance(.5)&&(d[i*u+n]=6,e.props.push({kind:`vent_ceiling`,x:o*a+(n+.5)*t.tile,y:l,z:s*a+(i+.5)*t.tile,rot:0}))}e.tiles=d}let p=(i.gx+.5)*a,m=(i.gz+.5)*a,h=[];for(let t=0;t<X;t++)for(let n=0;n<X;n++){let r=o+n,i=s+t;if(e.wallZ[c(n,t)]){let o=r*a,s=(i+.5)*a;h.push({x:o-u/2,z:s,ax:0,az:1,nx:-1,nz:0,zone:e.zone[c(Math.max(n-1,0),t)]}),h.push({x:o+u/2,z:s,ax:0,az:1,nx:1,nz:0,zone:e.zone[c(n,t)]})}if(e.wallX[c(n,t)]){let o=i*a,s=(r+.5)*a;h.push({x:s,z:o-u/2,ax:1,az:0,nx:0,nz:-1,zone:e.zone[c(n,Math.max(t-1,0))]}),h.push({x:s,z:o+u/2,ax:1,az:0,nx:0,nz:1,zone:e.zone[c(n,t)]})}}let g=Math.hypot(p-(o+X/2)*a,m-(s+X/2)*a);for(let n of h){let i=Math.atan2(n.nx,n.nz),o=e=>({x:n.x+n.ax*e,z:n.z+n.az*e});if(r.chance(t.outletChance)){let s=o(r.range(-a*.35,a*.35)),c=r.next(),l=`outlet_duplex`;c>.62&&(l=`outlet_twoprong`),c>.78&&(l=`outlet_gfci`),c>.88&&(l=`outlet_broken`),t.id===2&&l===`outlet_duplex`&&(l=r.chance(.5)?`outlet_broken`:`outlet_twoprong`);let u=l===`outlet_broken`?r.chance(.45):r.chance(.02),d=l===`outlet_broken`?.4:r.chance(.85)?.36:1.1;e.props.push({kind:l,x:s.x+n.nx*.001,y:d,z:s.z+n.nz*.001,rot:i,spark:u}),(u||l===`outlet_broken`)&&e.decals.push({tile:15,x:s.x,y:d+.28,z:s.z,nx:n.nx,nz:n.nz,w:.35,h:.6,flip:!1,alpha:u?.9:.5})}else if(r.chance(.04)){let t=o(r.chance(.5)?a*.38:-a*.38);e.props.push({kind:`switch_plate`,x:t.x+n.nx*.001,y:1.22,z:t.z+n.nz*.001,rot:i})}else if(r.chance(.02)){let t=o(r.range(-.5,.5));e.props.push({kind:`vent_wall`,x:t.x+n.nx*.001,y:r.chance(.5)?.2:l-.35,z:t.z+n.nz*.001,rot:i})}let s=n.zone===4;if(r.chance(s?.5:.1)){let t=o(r.range(-a*.3,a*.3)),i=r.range(.8,1.8);e.decals.push({tile:r.int(0,3),x:t.x,y:l-i/2,z:t.z,nx:n.nx,nz:n.nz,w:r.range(.6,1.4),h:i,flip:r.chance(.5),alpha:r.range(.5,1)})}if(r.chance(s?.45:.06)){let t=o(r.range(-a*.3,a*.3)),i=r.range(.3,.8);e.decals.push({tile:r.int(4,5),x:t.x,y:i/2,z:t.z,nx:n.nx,nz:n.nz,w:r.range(.6,1.6),h:i,flip:r.chance(.5),alpha:r.range(.5,1)})}if(r.chance(.05)){let t=o(r.range(-a*.3,a*.3));e.decals.push({tile:r.int(6,7),x:t.x,y:.3,z:t.z,nx:n.nx,nz:n.nz,w:.8,h:.8,flip:r.chance(.5),alpha:.8})}if(g<450&&r.chance(t.id===2?.04:.045)){let t=p-n.x,i=m-n.z,a=Math.hypot(t,i)||1,s=(n.ax*t+n.az*i)/a;if(Math.abs(s)>.35){let t=r.chance(.12),i=s>0?1:-1;t&&(i=-i);let a=n.nz===0?n.nx>0?-1:1:n.nz>0?1:-1,c=o(r.range(-.4,.4));e.decals.push({tile:r.int(8,11),x:c.x,y:r.range(1.1,1.6),z:c.z,nx:n.nx,nz:n.nz,w:.7,h:.7,flip:i!==a,alpha:.95})}}if(r.chance(.006)){let t=o(0);e.decals.push({tile:r.chance(.5)?12:13,x:t.x,y:r.range(.9,1.7),z:t.z,nx:n.nx,nz:n.nz,w:.7,h:.7,flip:!1,alpha:.9})}}for(let i=0;i<X;i++)for(let l=0;l<X;l++){let u=o+l,d=s+i,f=e.zone[c(l,i)],p=(u+.5)*a,m=(d+.5)*a;if((f===4&&r.chance(.35)||r.chance(t.id===1?.12:.02))&&e.decals.push({tile:14,x:p+r.range(-.6,.6),y:.003,z:m+r.range(-.6,.6),nx:0,nz:0,w:r.range(1,2.6),h:r.range(1,2.6),flip:r.chance(.5),alpha:r.range(.4,.9)}),!(Math.abs(u)<3&&Math.abs(d)<3)){if(r.chance(t.almondChance*(f===3?2:1))&&e.pickups.push({id:Ju(n,t.id,u,d,77),kind:`almond`,x:p+r.range(-.5,.5),y:0,z:m+r.range(-.5,.5)}),t.id===0)r.chance(.004)&&e.props.push({kind:`office_chair`,x:p+r.range(-.6,.6),y:0,z:m+r.range(-.6,.6),rot:r.range(0,6.28)}),f===4&&r.chance(.012)&&e.props.push({kind:`wet_floor_sign`,x:p,y:0,z:m,rot:r.range(0,6.28)});else if(t.id===1&&r.chance(f===1?.06:.025)){let i=r.int(1,3);for(let t=0;t<i;t++)e.props.push({kind:r.chance(.7)?`crate`:`pallet`,x:p+r.range(-1,1),y:0,z:m+r.range(-1,1),rot:Math.round(r.range(0,4))*(Math.PI/2)+r.range(-.1,.1)});r.chance(.5)&&e.pickups.push({id:Ju(n,t.id,u,d,78),kind:`almond`,x:p+.6,y:.72,z:m})}}}if(t.id===2)for(let t=0;t<X;t++)for(let r=0;r<X;r++){let i=o+r,d=s+t,f=Ju(n,i>>2,d>>2)%4;if(e.wallZ[c(r,t)]){let t=i*a,r=1+Ju(n,i,d,5)%3;for(let n=0;n<r;n++){let r=(n+i)%2==0?1:-1,o=[.04,.07,.11][sd(n+d,3)],s=l-.18-n*.24;e.pipes.push({x0:t+r*(u/2+o+.03),y0:s,z0:d*a-.001,x1:t+r*(u/2+o+.03),y1:s,z1:(d+1)*a+.001,r:o,tint:(f+n)%4})}}if(e.wallX[c(r,t)]){let t=d*a,r=1+Ju(n,i,d,6)%3;for(let n=0;n<r;n++){let r=(n+d)%2==0?1:-1,o=[.05,.08,.04][sd(n+i,3)],s=l-.22-n*.22;e.pipes.push({x0:i*a-.001,y0:s,z0:t+r*(u/2+o+.03),x1:(i+1)*a+.001,y1:s,z1:t+r*(u/2+o+.03),r:o,tint:(f+n+1)%4})}}(d%4+4)%4==1&&e.pipes.push({x0:i*a,y0:l-.16,z0:(d+.3)*a,x1:(i+1)*a,y1:l-.16,z1:(d+.3)*a,r:.14,tint:3}),Yu(n,i,d,55)<.03&&e.wallZ[c(r,t)]===1&&e.props.push({kind:Yu(n,i,d,56)<.5?`pipe_valve`:`pipe_gauge`,x:i*a+u/2+.2,y:l-.55,z:(d+.5)*a,rot:Math.PI/2})}}var md=class e{seed;level;cap;map=new Map;order=[];lastK=NaN;last=null;constructor(e,t,n=256){this.seed=e,this.level=t,this.cap=n}static key(e,t){return(e+32768)*65536+(t+32768)}get(t,n){let r=e.key(t,n);if(r===this.lastK)return this.last;let i=this.map.get(r);return i||(i=dd(this.seed,this.level,t,n),this.map.set(r,i),this.order.push(r),this.order.length>this.cap&&this.map.delete(this.order.shift())),this.lastK=r,this.last=i,i}has(t,n){return this.map.has(e.key(t,n))}put(t){let n=e.key(t.cx,t.cz);this.map.has(n)||this.order.push(n),this.map.set(n,t),n===this.lastK&&(this.last=t)}wallZ(e,t){return this.get(e>>4,t>>4).wallZ[(t&15)*X+(e&15)]}wallX(e,t){return this.get(e>>4,t>>4).wallX[(t&15)*X+(e&15)]}pillar(e,t){return this.get(e>>4,t>>4).pillar[(t&15)*X+(e&15)]}zone(e,t){return this.get(e>>4,t>>4).zone[(t&15)*X+(e&15)]}open(e,t,n){switch(n){case 0:return!this.wallZ(e+1,t);case 1:return!this.wallZ(e,t);case 2:return!this.wallX(e,t+1);default:return!this.wallX(e,t)}}};function hd(e){let t=16*id[e].cell,n=Math.round(t*3);return{T:n,R:n+2,S:t}}var gd={uLM:{value:null},uLMInfo:{value:new Qt(39,6,119,117)},uChunkState:{value:null},uPower:{value:new Qt(0,0,1e6,0)},uLightCol:{value:new G(1,.93,.75)},uAccentCol:{value:new G(1,.1,.05)},uLightGain:{value:1},uAmbient:{value:.01},uFogCol:{value:new G(.6,.55,.3)},uFogDensity:{value:.03},uCamE:{value:.5},uTime:{value:0},uTileTex:{value:null},uTileInfo:{value:new Qt(.6096,64,6,0)},uWallH:{value:2.74},uWet:{value:.3},uRtDiffuse:{value:.18},uFlash:{value:1},uBounceCol:{value:new G(.55,.45,.22)}},_d=`
#define LM_MAX ${6 .toFixed(3)}
uniform sampler2D uLM;
uniform vec4 uLMInfo;
uniform sampler2D uChunkState;
uniform vec4 uPower;
uniform vec3 uLightCol;
uniform vec3 uAccentCol;
uniform float uLightGain;
uniform float uAmbient;
uniform vec3 uFogCol;
uniform float uFogDensity;
uniform float uCamE;
uniform float uTime;
uniform sampler2D uTileTex;
uniform vec4 uTileInfo;
uniform float uWallH;
uniform float uWet;
uniform float uRtDiffuse;
uniform vec3 uBounceCol;
varying vec3 vWPos;
varying vec3 vWNrm;
float gDiffScale = 1.0;

float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
}
float fbm2(vec2 p) { return vn(p) * 0.55 + vn(p * 2.03 + 7.1) * 0.3 + vn(p * 4.1 + 3.3) * 0.15; }

vec2 lmSlot(vec2 xz, out vec2 local) {
  vec2 cw = xz / uLMInfo.x;
  vec2 ci = floor(cw);
  local = cw - ci;
  return mod(ci, uLMInfo.y);
}
vec4 lmFetch(vec2 xz) {
  vec2 local;
  vec2 slot = lmSlot(xz, local);
  vec2 texel = 1.0 + local * uLMInfo.w;
  return texture2D(uLM, (slot * uLMInfo.z + texel) / (uLMInfo.y * uLMInfo.z));
}
vec4 chunkState(vec2 xz) {
  vec2 local;
  vec2 slot = lmSlot(xz, local);
  return texture2D(uChunkState, (slot + 0.5) / uLMInfo.y);
}
float powerAt(vec3 p) {
  if (uPower.w < 0.5) return 1.0;
  return 1.0 - smoothstep(uPower.z, uPower.z + 4.0, length(p.xz - uPower.xy));
}
vec3 lmIrr(vec3 p, out float ao) {
  vec4 s = lmFetch(p.xz);
  vec4 cs = chunkState(p.xz);
  float pw = powerAt(p);
  ao = s.a;
  return ((s.r * s.r + s.g * s.g * cs.r) * uLightCol * pw + s.b * s.b * uAccentCol) * LM_MAX * uLightGain;
}
float lmLum(vec2 xz) { vec4 s = lmFetch(xz); return s.r * s.r + s.g * s.g + s.b * s.b; }
// one-bounce fill: light arriving in the neighbourhood, re-emitted tinted by the room's surfaces
vec3 lmBounce(vec3 p) {
  float b = lmLum(p.xz + vec2(1.4, 0.0)) + lmLum(p.xz - vec2(1.4, 0.0)) + lmLum(p.xz + vec2(0.0, 1.4)) + lmLum(p.xz - vec2(0.0, 1.4));
  return uBounceCol * b * 0.25 * LM_MAX * uLightGain * powerAt(p);
}
float lightLink(float link, vec3 p) {
  if (link < 0.5) return 1.0;
  float pw = powerAt(p);
  if (link < 1.5) return pw;
  return chunkState(p.xz).r * pw;
}
`;function vd(e,t){e.onBeforeCompile=e=>{Object.assign(e.uniforms,gd),e.defines=e.defines||{},e.defines[`SURF_`+t.toUpperCase()]=``;let n=t===`prop`||t===`lens`;e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vWPos;
varying vec3 vWNrm;
${n?`attribute vec4 aMat; varying vec4 vMat;`:``}`).replace(`#include <project_vertex>`,`#include <project_vertex>
{
  vec4 wp = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
  wp = instanceMatrix * wp;
  #endif
  #ifdef USE_BATCHING
  wp = batchingMatrix * wp;
  #endif
  vWPos = (modelMatrix * wp).xyz;
  vWNrm = normalize(mat3(modelMatrix) * objectNormal);
  ${n?`vMat = aMat;`:``}
}`);let r=e.fragmentShader;r=r.replace(`#include <common>`,`#include <common>\n${_d}\n${n?`varying vec4 vMat;`:``}`);let i=t===`ceil`?`
  vec2 tUvC = vMapUv * 0.5;
  vec2 tUv = vMapUv;
  if (uTileInfo.w > 0.5) {
    vec2 tc = floor(vWPos.xz / uTileInfo.x);
    vec2 slot = mod(floor(tc / uTileInfo.y), uTileInfo.z);
    vec2 within = mod(tc, uTileInfo.y);
    float st = floor(texture2D(uTileTex, (slot * uTileInfo.y + within + 0.5) / (uTileInfo.y * uTileInfo.z)).r * 255.0 + 0.5);
    if (st > 3.5) discard;
    vec2 f = fract(vWPos.xz / uTileInfo.x);
    float q = st;
    // atlas is 2x2 variants; image row 0 (variants 0,1) sits at the top (v in 0.5..1)
    tUv = vec2((mod(q, 2.0) + f.x) * 0.5, (1.0 - floor(q / 2.0)) * 0.5 + f.y * 0.5);
  }
  vec2 tDx = dFdx(tUvC);
  vec2 tDy = dFdy(tUvC);`:`
  vec2 tUv = vMapUv;
  vec2 tUvC = vMapUv;
  vec2 tDx = dFdx(tUvC);
  vec2 tDy = dFdy(tUvC);`;r=r.replace(`void main() {`,`void main() {\n#ifdef USE_MAP\n${i}\n#endif`);let a=(e,t,n)=>K[e].replace(t,n);r=r.replace(`#include <map_fragment>`,a(`map_fragment`,/texture2D\( map, vMapUv \)/g,`textureGrad( map, tUv, tDx, tDy )`)).replace(`#include <normal_fragment_begin>`,a(`normal_fragment_begin`,/vNormalMapUv/g,`tUvC`)).replace(`#include <normal_fragment_maps>`,a(`normal_fragment_maps`,/texture2D\( normalMap, vNormalMapUv \)/g,`textureGrad( normalMap, tUv, tDx, tDy )`)).replace(`#include <roughnessmap_fragment>`,a(`roughnessmap_fragment`,/texture2D\( roughnessMap, vRoughnessMapUv \)/g,`textureGrad( roughnessMap, tUv, tDx, tDy )`)).replace(`#include <metalnessmap_fragment>`,a(`metalnessmap_fragment`,/texture2D\( metalnessMap, vMetalnessMapUv \)/g,`textureGrad( metalnessMap, tUv, tDx, tDy )`)).replace(`#include <aomap_fragment>`,a(`aomap_fragment`,/texture2D\( aoMap, vAoMapUv \)/g,`textureGrad( aoMap, tUv, tDx, tDy )`)+`
#ifdef USE_AOMAP
  reflectedLight.directDiffuse *= ambientOcclusion;
  reflectedLight.directSpecular *= mix(1.0, ambientOcclusion, 0.6);
#endif`),r=r.replace(`#include <color_fragment>`,`#include <color_fragment>
#if defined(SURF_WALL)
  {
    float along = dot(vWPos.xz, abs(vWNrm.zx));
    float seg = h21(floor(vec2(along / 2.4384, dot(vWPos.xz, abs(vWNrm.xz)) * 7.0)));
    float big = fbm2(vec2(along, vWPos.y) * 0.25 + vWPos.xz * 0.05);
    diffuseColor.rgb *= 0.9 + 0.12 * big + 0.05 * (seg - 0.5);
    float low = 1.0 - smoothstep(0.0, 0.45, vWPos.y);
    diffuseColor.rgb *= mix(vec3(1.0), vec3(0.72, 0.66, 0.55), low * (0.55 + 0.45 * fbm2(vec2(along * 3.0, vWPos.y * 8.0))));
    float top = smoothstep(uWallH - 0.5, uWallH, vWPos.y);
    diffuseColor.rgb *= 1.0 - top * 0.12 * fbm2(vec2(along * 2.0, 0.0));
  }
#elif defined(SURF_FLOOR)
  {
    float big = fbm2(vWPos.xz * 0.09);
    float mid = fbm2(vWPos.xz * 0.6 + 3.0);
    diffuseColor.rgb *= 0.86 + 0.2 * big + 0.06 * mid;
    float wetM = smoothstep(0.58, 0.72, fbm2(vWPos.xz * 0.12 + 11.0)) * uWet;
    diffuseColor.rgb *= 1.0 - wetM * 0.35;
    // traffic wear down the middle of corridors is not knowable here; add subtle track noise
  }
#elif defined(SURF_CEIL)
  diffuseColor.rgb *= 0.94 + 0.08 * fbm2(vWPos.xz * 0.15);
#elif defined(SURF_PLENUM)
  diffuseColor.rgb = vec3(0.02);
#endif`),n&&(r=r.replace(`#include <metalnessmap_fragment>`,`#include <metalnessmap_fragment>
  metalnessFactor = vMat.y;`),r=r.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
  roughnessFactor = max(vMat.x, 0.05);`)),t===`floor`&&(r=r.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
  {
    float wetM = smoothstep(0.58, 0.72, fbm2(vWPos.xz * 0.12 + 11.0)) * uWet;
    roughnessFactor = mix(roughnessFactor, 0.12, wetM);
  }`)),t===`prop`&&(r=r.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance = vColor.rgb * vMat.z * lightLink(vMat.w, vWPos) * 3.0;`)),t===`lens`&&(r=r.replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
  totalEmissiveRadiance = sampledDiffuseColor.rgb * vColor.rgb * vMat.z * lightLink(vMat.w, vWPos) * 9.0;
  diffuseColor.rgb *= 0.12;`)),r=r.replace(`#include <lights_physical_pars_fragment>`,K.lights_physical_pars_fragment.replace(`reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );`,`reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F ) * gDiffScale;`)),r=r.replace(`#include <lights_fragment_begin>`,K.lights_fragment_begin.replace(`#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )`,`gDiffScale = uRtDiffuse;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )`).replace(`#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )`,`gDiffScale = 1.0;
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )`));let o={wall:`
      float ao;
      vec3 sp = vWPos + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.32;
      vec3 E = lmIrr(sp, ao);
      float hprof = mix(0.62, 1.0, smoothstep(0.0, 1.0, vWPos.y)) * mix(1.0, 0.78, smoothstep(uWallH - 0.7, uWallH, vWPos.y));
      float cao = mix(0.55, 1.0, smoothstep(0.0, 0.3, vWPos.y)) * mix(0.7, 1.0, smoothstep(0.0, 0.2, uWallH - vWPos.y));
      float gx = lmLum(sp.xz + vec2(0.4, 0.0)) - lmLum(sp.xz - vec2(0.4, 0.0));
      float gz = lmLum(sp.xz + vec2(0.0, 0.4)) - lmLum(sp.xz - vec2(0.0, 0.4));
      vec3 Lw = normalize(vec3(gx * 3.0, 0.9, gz * 3.0) + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.6);
      vec3 nW = inverseTransformDirection(normal, viewMatrix);
      float bump = clamp(dot(nW, Lw) / max(dot(vWNrm, Lw), 0.25), 0.35, 1.7);
      irradiance += (E * hprof * cao * mix(1.0, bump, 0.85) * 0.85 + lmBounce(sp) * 0.3 * cao + uAmbient) * PI;`,floor:`
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      float gx = lmLum(vWPos.xz + vec2(0.35, 0.0)) - lmLum(vWPos.xz - vec2(0.35, 0.0));
      float gz = lmLum(vWPos.xz + vec2(0.0, 0.35)) - lmLum(vWPos.xz - vec2(0.0, 0.35));
      vec3 Lf = normalize(vec3(gx * 2.5, 1.0, gz * 2.5));
      vec3 nW = inverseTransformDirection(normal, viewMatrix);
      float bump = clamp(dot(nW, Lf) / max(Lf.y, 0.3), 0.4, 1.5);
      irradiance += (E * ao * mix(1.0, bump, 0.9) + lmBounce(vWPos) * 0.22 * ao + uAmbient * ao) * PI;`,ceil:`
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += (E * 0.2 * (0.55 + 0.45 * ao) + lmBounce(vWPos) * 0.45 * (0.6 + 0.4 * ao) + uAmbient) * PI;`,plenum:`
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += E * 0.02 * PI;`,prop:`
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.15, ao);
      float up = 0.55 + 0.45 * vWNrm.y;
      irradiance += (E * mix(0.6, 1.0, ao) * up + lmBounce(vWPos) * 0.3 + uAmbient) * PI;`,pipe:`
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.15, ao);
      irradiance += (E * (0.5 + 0.3 * vWNrm.y) + uAmbient) * PI;`,lens:`
      float ao;
      vec3 E = lmIrr(vWPos, ao);
      irradiance += E * 0.1 * PI;`,decal:`
      float ao;
      vec3 sp = vWPos + vec3(vWNrm.x, 0.0, vWNrm.z) * 0.32;
      vec3 E = lmIrr(sp, ao);
      float cao = abs(vWNrm.y) > 0.5 ? ao : mix(0.55, 1.0, smoothstep(0.0, 0.3, vWPos.y));
      irradiance += (E * cao * (abs(vWNrm.y) > 0.5 ? 1.0 : 0.85) + uAmbient) * PI;`,entity:`
      float ao;
      vec3 E = lmIrr(vWPos + vWNrm * 0.2, ao);
      irradiance += (E * (0.5 + 0.35 * vWNrm.y) + lmBounce(vWPos) * 0.3 + uAmbient) * PI;`}[t];r=r.replace(`#include <lights_fragment_end>`,`{${o}}\n#include <lights_fragment_end>`),r=r.replace(`#include <fog_fragment>`,`{
  float fd = length(vWPos - cameraPosition);
  float ff = 1.0 - exp(-uFogDensity * uFogDensity * fd * fd);
  float el = lmLum(vWPos.xz) * LM_MAX * uLightGain * powerAt(vWPos);
  vec3 fogL = uFogCol * (0.5 * el + 0.5 * uCamE) * 0.55;
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogL, ff);
}`),e.fragmentShader=r},e.customProgramCacheKey=()=>`world-`+t}function yd(e,t={},n={}){let r=new La({color:16777215,roughness:1,metalness:+(e===`pipe`),...n});return t.map&&(r.map=t.map),t.normalMap&&(r.normalMap=t.normalMap,r.normalScale.set(1,1)),t.orm&&(r.roughnessMap=t.orm,r.metalnessMap=t.orm,r.aoMap=t.orm,r.aoMapIntensity=1),(e===`prop`||e===`lens`||e===`pipe`)&&(r.vertexColors=!0),e===`decal`&&(r.vertexColors=!0,r.transparent=!0,r.depthWrite=!1,r.polygonOffset=!0,r.polygonOffsetFactor=-2,r.polygonOffsetUnits=-2),vd(r,e),r}function bd(e){return vd(e,`entity`),e}function xd(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));return i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`),e.setIndex(i),e.clearGroups(),e}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Sd(e){let t=new Map,n=new Map,r=e.clone();return Cd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Cd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Cd(e.children[r],t.children[r],n)}var wd=class extends go{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new jd(e)}),this.register(function(e){return new Md(e)}),this.register(function(e){return new Vd(e)}),this.register(function(e){return new Hd(e)}),this.register(function(e){return new Ud(e)}),this.register(function(e){return new Pd(e)}),this.register(function(e){return new Fd(e)}),this.register(function(e){return new Id(e)}),this.register(function(e){return new Ld(e)}),this.register(function(e){return new Ad(e)}),this.register(function(e){return new Rd(e)}),this.register(function(e){return new Nd(e)}),this.register(function(e){return new Bd(e)}),this.register(function(e){return new zd(e)}),this.register(function(e){return new Od(e)}),this.register(function(e){return new Wd(e,Dd.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Wd(e,Dd.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Gd(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=Uo.extractUrlBase(e);a=Uo.resolveURL(t,this.path)}else a=Uo.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new yo(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===Kd){try{a[Dd.KHR_BINARY_GLTF]=new Yd(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Dd.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Sf(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Dd.KHR_MATERIALS_UNLIT:a[t]=new kd;break;case Dd.KHR_DRACO_MESH_COMPRESSION:a[t]=new Xd(i,this.dracoLoader);break;case Dd.KHR_TEXTURE_TRANSFORM:a[t]=new Zd;break;case Dd.KHR_MESH_QUANTIZATION:a[t]=new Qd;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Td(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Ed(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Dd={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},Od=class{constructor(e){this.parser=e,this.name=Dd.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new G(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],We);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new Ho(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new zo(s),o.distance=c;break;case`spot`:o=new Lo(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),mf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},kd=class{constructor(){this.name=Dd.KHR_MATERIALS_UNLIT}getMaterialType(){return ui}extendParams(e,t,n){let r=[];e.color=new G(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],We),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,Ue))}return Promise.all(r)}},Ad=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},jd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new V(e,e)}return Promise.all(r)}},Md=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Nd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},Pd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new G(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],We)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,Ue)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Fd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},Id=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new G().setRGB(i[0],i[1],i[2],We),Promise.all(r)}},Ld=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_IOR}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},Rd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new G().setRGB(i[0],i[1],i[2],We),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,Ue)),Promise.all(r)}},zd=class{constructor(e){this.parser=e,this.name=Dd.EXT_MATERIALS_BUMP}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},Bd=class{constructor(e){this.parser=e,this.name=Dd.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ed(this.parser,e,this.name)===null?null:Ra}extendMaterialParams(e,t){let n=Ed(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},Vd=class{constructor(e){this.parser=e,this.name=Dd.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},Hd=class{constructor(e){this.parser=e,this.name=Dd.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Ud=class{constructor(e){this.parser=e,this.name=Dd.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Wd=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},Gd=class{constructor(e){this.name=Dd.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==nf.TRIANGLES&&e.mode!==nf.TRIANGLE_STRIP&&e.mode!==nf.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new W,n=new H,a=new Pt,s=new H(1,1,1),c=new Ji(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Bi(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Nr,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Bi(t.array,t.itemSize,t.normalized))}An.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},Kd=`glTF`,qd=12,Jd={JSON:1313821514,BIN:5130562},Yd=class{constructor(e){this.name=Dd.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qd),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Kd)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-qd,i=new DataView(e,qd),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Jd.JSON){let r=new Uint8Array(e,qd+a,t);this.content=n.decode(r)}else if(r===Jd.BIN){let n=qd+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},Xd=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Dd.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=cf[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=cf[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=rf[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,We,n)})})}},Zd=class{constructor(){this.name=Dd.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Qd=class{constructor(){this.name=Dd.KHR_MESH_QUANTIZATION}},$d=class extends Ka{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},ef=new Pt,tf=class extends $d{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return ef.fromArray(i).normalize().toArray(i),i}},nf={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},rf={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},af={9728:i,9729:s,9984:a,9985:c,9986:o,9987:l},of={33071:n,33648:r,10497:t},sf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},cf={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},lf={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},uf={CUBICSPLINE:void 0,LINEAR:I,STEP:Ie},df={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function ff(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new La({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function pf(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function mf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function hf(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function gf(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function _f(e){let t,n=e.extensions&&e.extensions[Dd.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+vf(n.attributes):e.indices+`:`+vf(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+vf(e.targets[n]);return t}function vf(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function yf(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function bf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var xf=new W,Sf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Td,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new So(this.options.manager):new Go(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new yo(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return pf(i,a,r),mf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Dd.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(Uo.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=sf[r.type],t=rf[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new vr(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=sf[r.type],o=rf[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Pr(f,u/s),t.cache.add(n,c)),p=new Ir(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new vr(f,a,d);if(r.sparse!==void 0){let t=sf.SCALAR,n=rf[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new vr(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=af[n.magFilter]||1006,t.minFilter=af[n.minFilter]||1008,t.wrapS=of[n.wrapS]||1e3,t.wrapT=of[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Zt(e);t.needsUpdate=!0,n(t)}),t.load(Uo.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),mf(e,a),e.userData.mimeType=a.mimeType||bf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Dd.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Dd.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Dd.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new pa,Hr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new $i,Hr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return La}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[Dd.KHR_MATERIALS_UNLIT]){let e=r[Dd.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new G(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],We),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,Ue)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||df.OPAQUE;if(l===df.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===df.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==ui&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new V(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==ui&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==ui){let e=i.emissiveFactor;o.emissive=new G().setRGB(e[0],e[1],e[2],We)}return i.emissiveTexture!==void 0&&a!==ui&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,Ue)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),mf(n,i),t.associations.set(n,{materials:e}),i.extensions&&pf(r,n,i),n})}createUniqueName(e){let t=us.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Dd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return wf(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=_f(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Dd.KHR_DRACO_MESH_COMPRESSION]?i(o):wf(new Nr,o,t),o.mode===nf.TRIANGLE_STRIP?e=e.then(e=>xd(e,1)):o.mode===nf.TRIANGLE_FAN&&(e=e.then(e=>xd(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?ff(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===nf.TRIANGLES||u.mode===nf.TRIANGLE_STRIP||u.mode===nf.TRIANGLE_FAN||u.mode===void 0){let e=i.isSkinnedMesh===!0,t=l.hasAttribute(`skinIndex`)&&l.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),d=e&&t?new Pi(l,f):new Si(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights()}else if(u.mode===nf.LINES)d=new da(l,f);else if(u.mode===nf.LINE_STRIP)d=new sa(l,f);else if(u.mode===nf.LINE_LOOP)d=new fa(l,f);else if(u.mode===nf.POINTS)d=new va(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&gf(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),mf(d,i),u.extensions&&pf(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&pf(r,c[0],i),c[0];let l=new jn;i.extensions&&pf(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new Fo(Nt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new Bo(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),mf(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new W;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new zi(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new lo(i,void 0,l);return mf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,xf)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new H().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new Fi:t.length>1?new jn:t.length===1?t[0]:new An,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),mf(o,i),i.extensions&&pf(n,o,i),i.matrix!==void 0){let e=new W;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new jn;n.name&&(i.name=r.createUniqueName(n.name)),mf(i,n),n.extensions&&pf(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Sd(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Hr||e instanceof Zt)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}lf[i.path]===lf.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(lf[i.path]){case lf.weights:l=io;break;case lf.rotation:l=oo;break;case lf.translation:case lf.scale:l=co;break;default:switch(n.itemSize){case 1:l=io;break;default:l=co}}let u=r.interpolation===void 0?I:uf[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+lf[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=yf(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof oo?tf:$d)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Cf(e,t,n){let r=t.attributes,i=new er;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new H(t[0],t[1],t[2]),new H(a[0],a[1],a[2])),e.normalized){let t=yf(rf[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new H,t=new H;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=yf(rf[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new Tr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function wf(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=cf[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Vt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Vt.workingColorSpace}" not supported.`),mf(e,t),Cf(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:hf(e,t.targets,n)})}function Tf(){let e=location.pathname;return!e.endsWith(`/`)&&!/\.html?$/.test(e)&&(e+=`/`),e=e.replace(/[^/]*$/,``),e=e.replace(/play\/$/,``),location.origin+e}var Ef=Tf()+`assets/`;function Df(e){return Ef+e}var Of=new So,kf=new wd,Af=8;function jf(e){Af=e}function Mf(e,n,r=!0){return new Promise((i,a)=>Of.load(Df(e),e=>{e.colorSpace=n?Ue:``,r&&(e.wrapS=e.wrapT=t),e.anisotropy=Af,e.generateMipmaps=!0,e.minFilter=l,i(e)},void 0,a))}async function Nf(e,t){let[n,r,i]=await Promise.all([Mf(`textures/${t}/${e}_albedo.webp`,!0),Mf(`textures/${t}/${e}_normal.webp`,!1),Mf(`textures/${t}/${e}_orm.webp`,!1)]);return{map:n,normalMap:r,orm:i}}var Pf=new Map;function Ff(e){let t=Pf.get(e);return t||(t=kf.loadAsync(Df(`models/${e}.glb`)),Pf.set(e,t)),t}function If(e){let t=[];return e.scene.updateMatrixWorld(!0),e.scene.traverse(e=>{let n=e;if(!n.isMesh||n.isSkinnedMesh)return;let r=(n.geometry.index,n.geometry),i=r.getAttribute(`position`),a=r.getAttribute(`normal`),o=r.getAttribute(`uv`),s=n.matrixWorld,c=new U().getNormalMatrix(s),l=new H,u=new Float32Array(i.count*3),d=new Float32Array(i.count*3);for(let e=0;e<i.count;e++)l.fromBufferAttribute(i,e).applyMatrix4(s),u.set([l.x,l.y,l.z],e*3),l.fromBufferAttribute(a,e).applyMatrix3(c).normalize(),d.set([l.x,l.y,l.z],e*3);let f=r.index?new Uint32Array(r.index.array):new Uint32Array(i.count).map((e,t)=>t),p=n.material,m=p.emissive?p.emissive.r+p.emissive.g+p.emissive.b:0,h=p.color??new G(1,1,1),g=m>0?[p.emissive.r,p.emissive.g,p.emissive.b]:[h.r,h.g,h.b];t.push({name:p.name||`mat`,pos:u,nrm:d,uv:o?new Float32Array(o.array):null,idx:f,color:g,rough:p.roughness??.6,metal:p.metalness??0,emissive:m>0?p.emissiveIntensity??1:0})}),t}var Lf=[`outlet_duplex`,`outlet_twoprong`,`outlet_gfci`,`outlet_broken`,`switch_plate`,`vent_wall`,`vent_ceiling`,`office_chair`,`wet_floor_sign`,`crate`,`pallet`,`pipe_valve`,`pipe_gauge`,`floor_box`,`troffer`,`troffer_hanging`,`lamp_highbay`,`lamp_caged`];async function Rf(e){let t={},n=0;return await Promise.all(Lf.map(async r=>{t[r]=If(await Ff(r)),e?.(++n/Lf.length)})),t}var zf=null;function Bf(){return zf||=fetch(Df(`audio/manifest.json`)).then(e=>e.json()),zf}function Vf(){let e=document.createElement(`audio`);return!/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)&&e.canPlayType(`audio/ogg; codecs="vorbis"`)?`ogg`:`m4a`}function Hf(e){let t=new Nr;return t.setAttribute(`position`,new vr(e.pos,3)),t.setAttribute(`normal`,new vr(e.nrm,3)),t.setAttribute(`uv`,new vr(e.uv,2)),e.col&&t.setAttribute(`color`,new vr(e.col,4)),e.mat&&t.setAttribute(`aMat`,new vr(e.mat,4)),t.setIndex(new vr(e.idx,1)),t.computeBoundingSphere(),t}var Uf=class{seed;level;def;cache;root=new jn;chunks=new Map;pending=new Set;workers=[];rr=0;slots;lmAtlas;tileAtlas=null;chunkState;dirtyLM=!1;dirtyTiles=!1;mats;radius;onChunkLoaded;onChunkUnloaded;gen=0;constructor(e,t,n,r){this.seed=e,this.level=t,this.def=id[t],this.cache=new md(e,t,400),this.radius=r,this.slots=r*2+3;let{R:a,T:o,S:c}=hd(t),l=this.slots*a;if(this.lmAtlas=new Ii(new Uint8Array(l*l*4),l,l,T),this.lmAtlas.magFilter=s,this.lmAtlas.minFilter=s,this.lmAtlas.needsUpdate=!0,gd.uLM.value=this.lmAtlas,gd.uLMInfo.value.set(c,this.slots,a,o),this.chunkState=new Ii(new Uint8Array(this.slots*this.slots*4).fill(255),this.slots,this.slots,T),this.chunkState.needsUpdate=!0,gd.uChunkState.value=this.chunkState,this.def.tile>0){let e=16*Math.round(this.def.cell/this.def.tile),t=this.slots*e;this.tileAtlas=new Ii(new Uint8Array(t*t),t,t,O),this.tileAtlas.magFilter=i,this.tileAtlas.minFilter=i,this.tileAtlas.needsUpdate=!0,gd.uTileTex.value=this.tileAtlas,gd.uTileInfo.value.set(this.def.tile,e,this.slots,1)}else gd.uTileInfo.value.w=0,gd.uTileTex.value=this.chunkState;gd.uWallH.value=this.def.height;let u=Math.min(3,Math.max(1,(navigator.hardwareConcurrency||4)-2));for(let e=0;e<u;e++){let e=new Worker(new URL(new URL(`worldgen.worker-CdmvgkPY.js`,import.meta.url).href,``+import.meta.url),{type:`module`});e.postMessage({type:`protos`,protos:n}),e.onmessage=e=>this.onMessage(e.data),this.workers.push(e)}}async loadMaterials(e){let t=this.def,[r,i,a,o,s]=await Promise.all([Nf(t.tex.wall,e),Nf(t.tex.floor,e),t.tex.ceil?Nf(t.tex.ceil,e):Promise.resolve(null),Mf(`textures/${e}/l0_lens.webp`,!0,!1),Mf(`textures/${e}/decals.webp`,!0,!1)]),c=t.id===2?await Nf(`l2_pipe`,e):null,l=a??r;if(this.mats={walls:yd(`wall`,r),floor:yd(`floor`,i),ceil:yd(`ceil`,l,t.tile>0?{}:{color:new G(.7,.7,.7)}),plenum:yd(`plenum`,{},{color:328965}),lens:yd(`lens`,{map:o}),props:yd(`prop`),decals:yd(`decal`,{map:s}),pipes:yd(`pipe`,c??{})},t.tile>0)for(let e of[a.map,a.normalMap,a.orm])e.wrapS=e.wrapT=n}async swapTier(e){let t=this.mats;await this.loadMaterials(e);for(let e of this.chunks.values())e.group.traverse(e=>{let t=e;if(!t.isMesh)return;let n=t.name===`small`?this.mats.props:this.mats[t.name];n&&(t.material=n)});for(let e of Object.values(t??{}))e.dispose()}key(e,t){return md.key(e,t)}slotOf(e,t){let n=this.slots;return(t%n+n)%n*n+(e%n+n)%n}update(e,t){let n=16*this.def.cell,r=Math.floor(e/n),i=Math.floor(t/n),a=this.radius,o=[];for(let s=-a;s<=a;s++)for(let c=-a;c<=a;c++){let l=r+c,u=i+s,d=Math.max(l*n-e,0,e-(l+1)*n),f=Math.max(u*n-t,0,t-(u+1)*n),p=Math.hypot(d,f);if(p>a*n*.92)continue;let m=this.key(l,u);!this.chunks.has(m)&&!this.pending.has(m)&&o.push([p,l,u])}o.sort((e,t)=>e[0]-t[0]);for(let[,e,t]of o.slice(0,4-Math.min(this.pending.size,4)))this.request(e,t);for(let[o,s]of this.chunks)if(Math.max(Math.abs(s.cx-r),Math.abs(s.cz-i))>a+1)this.unload(o);else{let r=s.group.getObjectByName(`small`);if(r){let i=Math.max(s.cx*n-e,0,e-(s.cx+1)*n),a=Math.max(s.cz*n-t,0,t-(s.cz+1)*n);r.visible=Math.hypot(i,a)<18}}return this.dirtyLM&&=(this.lmAtlas.needsUpdate=!0,!1),this.dirtyTiles&&this.tileAtlas&&(this.tileAtlas.needsUpdate=!0,this.dirtyTiles=!1),o.length+this.pending.size}request(e,t){let n=this.key(e,t);this.pending.add(n),this.workers[this.rr++%this.workers.length].postMessage({type:`chunk`,seed:this.seed,level:this.level,cx:e,cz:t,id:this.gen})}async prime(e,t){await new Promise(n=>{let r=()=>{this.update(e,t)===0?n():setTimeout(r,30)};r()})}onMessage(e){if(e.type!==`chunk`||e.seed!==this.seed||e.level!==this.level||e.id!==this.gen)return;let t=this.key(e.cx,e.cz);if(this.pending.delete(t),this.chunks.has(t))return;let n=this.slotOf(e.cx,e.cz);for(let[e,t]of this.chunks)t.slot===n&&this.unload(e);this.cache.put(e.layout);let r=new jn;r.name=`chunk ${e.cx},${e.cz}`;for(let[t,n]of Object.entries(e.meshes)){if(!n)continue;let e=t===`small`?this.mats.props:this.mats[t];if(!e)continue;let i=new Si(Hf(n),e);i.matrixAutoUpdate=!1,i.name=t,t===`decals`&&(i.renderOrder=1),i.castShadow=t===`walls`||t===`props`||t===`pipes`,i.receiveShadow=!0,r.add(i)}let{R:i}=hd(this.level),a=this.slots*i,o=n%this.slots,s=Math.floor(n/this.slots),c=this.lmAtlas.image.data;for(let t=0;t<i;t++)c.set(e.lightmap.subarray(t*i*4,(t+1)*i*4),((s*i+t)*a+o*i)*4);if(this.dirtyLM=!0,this.tileAtlas&&e.layout.tiles){let t=Math.round(Math.sqrt(e.layout.tiles.length)),n=this.slots*t,r=this.tileAtlas.image.data;for(let i=0;i<t;i++)r.set(e.layout.tiles.subarray(i*t,(i+1)*t),(s*t+i)*n+o*t);this.dirtyTiles=!0}let l=e.layout.props.filter(e=>e.spark).map(e=>({x:e.x,y:e.y,z:e.z,nx:Math.sin(e.rot),nz:Math.cos(e.rot)})),u={cx:e.cx,cz:e.cz,slot:n,group:r,layout:e.layout,lightmap:e.lightmap,sparks:l};this.chunks.set(t,u),this.root.add(r),this.onChunkLoaded?.(u)}unload(e){let t=this.chunks.get(e);t&&(this.root.remove(t.group),t.group.traverse(e=>{let t=e;t.isMesh&&t.geometry&&t.geometry.dispose()}),this.chunks.delete(e),this.onChunkUnloaded?.(t))}updateStates(e){let t=this.chunkState.image.data;for(let n of this.chunks.values())t[n.slot*4]=Math.round(Wf(n.cx,n.cz,e)*255);this.chunkState.needsUpdate=!0}sampleE(e,t){let{R:n,T:r,S:i}=hd(this.level),a=Math.floor(e/i),o=Math.floor(t/i),s=this.chunks.get(this.key(a,o));if(!s)return 0;let c=Math.min(n-1,Math.max(0,Math.floor(1+(e-a*i)/i*r))),l=(Math.min(n-1,Math.max(0,Math.floor(1+(t-o*i)/i*r)))*n+c)*4,u=Wf(a,o,gd.uTime.value),d=s.lightmap[l]/255,f=s.lightmap[l+1]/255,p=s.lightmap[l+2]/255;return(d*d+f*f*u+p*p*.5)*6}lightsNear(e,t,n,r=[]){r.length=0;let i=16*this.def.cell,a=n*n,o=Math.floor(e/i),s=Math.floor(t/i);for(let n=-1;n<=1;n++)for(let i=-1;i<=1;i++){let c=this.chunks.get(this.key(o+i,s+n));if(c)for(let n of c.layout.lights){if(n.state!==0&&n.state!==1)continue;let i=n.x-e,o=n.z-t;i*i+o*o<a&&r.push(Object.assign({key:n.gx*100003+n.gz,chunk:c},n))}}return r}pickups(){let e=[];for(let t of this.chunks.values())e.push(...t.layout.pickups);return e}exitInfo(){for(let e of this.chunks.values())if(e.layout.exit)return e.layout.exit;return null}dispose(){this.gen++;for(let e of[...this.chunks.keys()])this.unload(e);for(let e of this.workers)e.terminate();this.workers=[],this.lmAtlas.dispose(),this.tileAtlas?.dispose(),this.chunkState.dispose();for(let e of Object.values(this.mats??{}))e.dispose()}};function Wf(e,t,n){let r=Yu(e,t,404)*100;if(!(Yu(Math.floor(n*.35+r),e,t)<.45))return 1;let i=Yu(Math.floor(n*14+r*3),e,t,9);return i<.3?.05:i<.45?.4+i:1}var Gf=class{cache;extra=[];boxes=[];constructor(e){this.cache=e}gather(e,t,n=1){let r=id[this.cache.level],i=r.cell,a=r.wallThick/2,o=Math.floor(e/i),s=Math.floor(t/i),c=this.boxes;c.length=0;for(let e=s-n;e<=s+n;e++)for(let t=o-n;t<=o+n;t++)if(this.cache.wallZ(t,e)&&c.push({x0:t*i-a,z0:e*i-a,x1:t*i+a,z1:(e+1)*i+a}),this.cache.wallX(t,e)&&c.push({x0:t*i-a,z0:e*i-a,x1:(t+1)*i+a,z1:e*i+a}),this.cache.pillar(t,e)){let n=r.pillarSize/2;c.push({x0:t*i-n,z0:e*i-n,x1:t*i+n,z1:e*i+n})}for(let n of this.extra)n.x1>e-4&&n.x0<e+4&&n.z1>t-4&&n.z0<t+4&&c.push(n);return c}resolve(e,t,n){let r=this.gather(e,t),i=!1,a=0,o=0;for(let s=0;s<3;s++){let s=!1;for(let c of r){let r=Math.max(c.x0,Math.min(e,c.x1)),l=Math.max(c.z0,Math.min(t,c.z1)),u=e-r,d=t-l,f=u*u+d*d;if(f>=n*n)continue;let p=Math.sqrt(f);if(p<1e-5){let r=[e-c.x0,c.x1-e,t-c.z0,c.z1-t],i=r.indexOf(Math.min(...r));u=i===0?-1:+(i===1),d=i===2?-1:+(i===3),p=0,e+=u*(r[i]+n),t+=d*(r[i]+n)}else{let r=n-p;e+=u/p*r,t+=d/p*r,u/=p,d/=p}a=u,o=d,i=!0,s=!0}if(!s)break}return{x:e,z:t,hit:i,nx:a,nz:o}}los(e,t,n,r){let i=id[this.cache.level].cell,a=Math.floor(e/i),o=Math.floor(t/i),s=Math.floor(n/i),c=Math.floor(r/i),l=n-e,u=r-t,d=l>0?1:-1,f=u>0?1:-1,p=l===0?1/0:Math.abs(i/l),m=u===0?1/0:Math.abs(i/u),h=l===0?1/0:(d>0?(a+1)*i-e:e-a*i)/Math.abs(l),g=u===0?1/0:(f>0?(o+1)*i-t:t-o*i)/Math.abs(u);for(let e=0;e<200;e++){if(a===s&&o===c)return!0;if(h<g){if(h>1)return!0;if(this.cache.wallZ(d>0?a+1:a,o))return!1;a+=d,h+=p}else{if(g>1)return!0;if(this.cache.wallX(a,f>0?o+1:o))return!1;o+=f,g+=m}}return!0}},Kf=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;function qf(e,t,n={}){return new Fa({vertexShader:Kf,fragmentShader:e,uniforms:t,defines:n,depthTest:!1,depthWrite:!1})}var Jf=`
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uThreshold;
varying vec2 vUv;
void main() {
  vec3 c = vec3(0.0);
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  c *= 0.25;
  float l = max(max(c.r, c.g), c.b);
  float k = max(l - uThreshold, 0.0) / max(l, 1e-4);
  gl_FragColor = vec4(min(c * k, vec3(40.0)), 1.0);
}`,Yf=`
uniform sampler2D tSrc; uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tSrc, vUv).rgb * 4.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  gl_FragColor = vec4(c / 8.0, 1.0);
}`,Xf=`
uniform sampler2D tSrc; uniform sampler2D tPrev; uniform vec2 uTexel; uniform float uMix;
varying vec2 vUv;
void main() {
  vec3 c = vec3(0.0);
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, 0.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, 0.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(0.0, -1.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(0.0,  1.0)).rgb * 2.0;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0, -1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2(-1.0,  1.0)).rgb;
  c += texture2D(tSrc, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  c /= 12.0;
  gl_FragColor = vec4(texture2D(tPrev, vUv).rgb + c * uMix, 1.0);
}`,Zf=`
#include <common>
#include <tonemapping_pars_fragment>
uniform sampler2D tScene; uniform sampler2D tDepth; uniform sampler2D tBloom; uniform sampler2D tAO; uniform float uAO;
uniform mat4 uInvViewProj; uniform mat4 uPrevViewProj;
uniform float uBlur; uniform float uBloom; uniform float uExposure;
uniform vec3 uTint; uniform float uSat; uniform float uContrast; uniform float uLift;
uniform float uFade; uniform vec3 uFadeCol; uniform float uDesat; uniform float uRed;
varying vec2 vUv;
void main() {
  vec3 col = texture2D(tScene, vUv).rgb;
  #if BLUR_SAMPLES > 0
  if (uBlur > 0.001) {
    float d = texture2D(tDepth, vUv).x;
    vec4 ndc = vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
    vec4 wp = uInvViewProj * ndc; wp /= wp.w;
    vec4 pc = uPrevViewProj * wp;
    vec2 prev = (pc.xy / pc.w) * 0.5 + 0.5;
    vec2 vel = (vUv - prev) * uBlur;
    float vl = length(vel);
    if (vl > 0.04) vel *= 0.04 / vl;
    if (vl > 0.0005) {
      vec3 acc = col;
      float jitter = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
      for (int i = 1; i < BLUR_SAMPLES; i++) {
        float t = (float(i) + jitter) / float(BLUR_SAMPLES) - 0.5;
        acc += texture2D(tScene, vUv + vel * t).rgb;
      }
      col = acc / float(BLUR_SAMPLES);
    }
  }
  #endif
  if (uAO > 0.0) { float ao = texture2D(tAO, vUv).r; col *= mix(1.0, ao * ao, uAO); }
  col += texture2D(tBloom, vUv).rgb * uBloom;
  col *= uExposure;
  col = AgXToneMapping(col);
  // grade
  col = col * uTint;
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, uSat * (1.0 - uDesat));
  col = (col - 0.5) * uContrast + 0.5;
  col = col + uLift * (1.0 - col);
  col = mix(col, col * vec3(1.25, 0.55, 0.5), uRed);
  col = mix(col, uFadeCol, uFade);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`,Qf=`
uniform sampler2D tSrc; uniform vec2 uRes; uniform float uTime; uniform float uAmt; uniform float uGrain;
uniform float uGlitch; uniform float uVignette; uniform float uHaze; uniform float uSharpen; uniform float uFxaa; uniform float uShock;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float luma(vec3 c) { return sqrt(dot(c, vec3(0.299, 0.587, 0.114))); }
vec3 fxaa(vec2 uv, vec2 px) {
  vec3 rgbM = texture2D(tSrc, uv).rgb;
  vec3 rgbNW = texture2D(tSrc, uv + vec2(-1.0, -1.0) * px).rgb;
  vec3 rgbNE = texture2D(tSrc, uv + vec2(1.0, -1.0) * px).rgb;
  vec3 rgbSW = texture2D(tSrc, uv + vec2(-1.0, 1.0) * px).rgb;
  vec3 rgbSE = texture2D(tSrc, uv + vec2(1.0, 1.0) * px).rgb;
  float lM = luma(rgbM), lNW = luma(rgbNW), lNE = luma(rgbNE), lSW = luma(rgbSW), lSE = luma(rgbSE);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));
  float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  if (lMax - lMin < max(0.0312, lMax * 0.125)) return rgbM;
  vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), ((lNW + lSW) - (lNE + lSE)));
  float red = max((lNW + lNE + lSW + lSE) * 0.03125, 1.0 / 128.0);
  float rcp = 1.0 / (min(abs(dir.x), abs(dir.y)) + red);
  dir = clamp(dir * rcp, -8.0, 8.0) * px;
  vec3 a = 0.5 * (texture2D(tSrc, uv + dir * (1.0 / 3.0 - 0.5)).rgb + texture2D(tSrc, uv + dir * (2.0 / 3.0 - 0.5)).rgb);
  vec3 b = a * 0.5 + 0.25 * (texture2D(tSrc, uv + dir * -0.5).rgb + texture2D(tSrc, uv + dir * 0.5).rgb);
  float lB = luma(b);
  return (lB < lMin || lB > lMax) ? a : b;
}
void main() {
  vec2 uv = vUv;
  vec2 cc = uv - 0.5;
  // only a scare/death glitch displaces the image; normal play is clean
  float jitter = (hash(vec2(floor(uv.y * 240.0), floor(uTime * 30.0))) - 0.5);
  uv.x += jitter * 0.02 * uGlitch;
  uv.y += uGlitch * 0.01 * sin(uTime * 90.0);
  uv += uHaze * 0.0012 * vec2(sin(uv.y * 60.0 + uTime * 3.0), cos(uv.x * 50.0 + uTime * 2.3));
  vec2 px = 1.0 / uRes;
  vec3 col = uFxaa > 0.5 ? fxaa(uv, px) : texture2D(tSrc, uv).rgb;
  // contrast-adaptive sharpening (AMD CAS-style, 4 neighbours)
  vec3 n = texture2D(tSrc, uv + vec2(0.0, -px.y)).rgb;
  vec3 s2 = texture2D(tSrc, uv + vec2(0.0, px.y)).rgb;
  vec3 e = texture2D(tSrc, uv + vec2(px.x, 0.0)).rgb;
  vec3 w = texture2D(tSrc, uv + vec2(-px.x, 0.0)).rgb;
  vec3 mn = min(col, min(min(n, s2), min(e, w)));
  vec3 mx = max(col, max(max(n, s2), max(e, w)));
  vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, 1e-4), 0.0, 1.0));
  vec3 wgt = -amp * mix(0.125, 0.2, uSharpen);
  col = clamp((col + (n + s2 + e + w) * wgt) / (1.0 + 4.0 * wgt), 0.0, 1.0);
  // very faint tape character: slight chroma offset toward the edges
  float ca = (0.0006 + 0.004 * uGlitch) * uAmt + 0.03 * uShock;
  float cm = clamp(0.5 * uAmt + uShock, 0.0, 1.0);
  col.r = mix(col.r, texture2D(tSrc, uv + cc * ca).r, cm);
  col.b = mix(col.b, texture2D(tSrc, uv - cc * ca).b, cm);
  // fine film grain, strongest in shadows
  float g = hash(uv * uRes + fract(uTime * 7.13) * 100.0) - 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += g * uGrain * (0.025 + 0.04 * (1.0 - lum));
  float v = smoothstep(0.9, 0.25, length(cc * vec2(1.0, 0.8)));
  col *= mix(1.0, v, uVignette);
  // jumpscare impact frame: blown-out flash with a red cast at the edges
  col = mix(col, vec3(1.0, 0.93, 0.88) * mix(1.0, 0.55, 1.0 - v) + vec3(0.3, 0.0, 0.0) * (1.0 - v), clamp(uShock, 0.0, 1.0) * 0.85);
  gl_FragColor = vec4(sRGBTransferOETF(vec4(max(col, 0.0), 1.0)).rgb, 1.0);
}`,$f=`
uniform sampler2D tDepth; uniform mat4 uProj; uniform mat4 uInvProj; uniform vec2 uTexel; uniform float uRadius; uniform float uTime;
varying vec2 vUv;
vec3 viewPos(vec2 uv) {
  float d = texture2D(tDepth, uv).x;
  vec4 p = uInvProj * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  return p.xyz / p.w;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float d = texture2D(tDepth, vUv).x;
  if (d >= 1.0) { gl_FragColor = vec4(1.0); return; }
  vec3 P = viewPos(vUv);
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  float occ = 0.0;
  float a0 = hash(vUv * 731.0) * 6.2831;
  const int S = 10;
  for (int i = 0; i < S; i++) {
    float t = (float(i) + 0.5) / float(S);
    float ang = a0 + float(i) * 2.39996;
    float r = uRadius * t * t * 0.9 + 0.05;
    vec3 dir = normalize(vec3(cos(ang) * sqrt(1.0 - t), sin(ang) * sqrt(1.0 - t), sqrt(t) + 0.2));
    // orient hemisphere around N
    vec3 up = abs(N.z) < 0.99 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, N));
    vec3 B = cross(N, T);
    vec3 sp = P + (T * dir.x + B * dir.y + N * dir.z) * r;
    vec4 cp = uProj * vec4(sp, 1.0);
    vec2 suv = cp.xy / cp.w * 0.5 + 0.5;
    if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) continue;
    float sz = viewPos(suv).z;
    float range = smoothstep(0.0, 1.0, uRadius / abs(P.z - sz));
    occ += (sz >= sp.z + 0.02 ? 1.0 : 0.0) * range;
  }
  float ao = 1.0 - occ / float(S);
  gl_FragColor = vec4(vec3(ao), 1.0);
}`,ep=`
uniform sampler2D tSrc; uniform vec2 uTexel;
varying vec2 vUv;
void main() {
  float s = 0.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) s += texture2D(tSrc, vUv + vec2(float(x), float(y)) * uTexel * 1.5).r;
  gl_FragColor = vec4(vec3(s / 9.0), 1.0);
}`,tp=class{renderer;s;sceneRT;ldrRT;aoRT;aoBlurRT;ssao=qf($f,{tDepth:{value:null},uProj:{value:new W},uInvProj:{value:new W},uTexel:{value:new V},uRadius:{value:.55},uTime:{value:0}});aoBlur=qf(ep,{tSrc:{value:null},uTexel:{value:new V}});bloomRTs=[];upRTs=[];quad;qScene=new zn;qCam=new Bo(-1,1,1,-1,0,1);bright=qf(Jf,{tSrc:{value:null},uTexel:{value:new V},uThreshold:{value:1}});down=qf(Yf,{tSrc:{value:null},uTexel:{value:new V}});up=qf(Xf,{tSrc:{value:null},tPrev:{value:null},uTexel:{value:new V},uMix:{value:1}});composite;vhs=qf(Qf,{tSrc:{value:null},uRes:{value:new V},uTime:{value:0},uAmt:{value:.5},uGrain:{value:1},uGlitch:{value:0},uShock:{value:0},uVignette:{value:.25},uSharpen:{value:.5},uFxaa:{value:1},uHaze:{value:0}});prevVP=new W;tmp=new W;w=1;h=1;black=new Si(new Ea(2,2));constructor(e,t){this.renderer=e,this.s=t,this.quad=new Si(new Ea(2,2),this.bright),this.quad.frustumCulled=!1,this.qScene.add(this.quad),this.buildComposite(),this.black}buildComposite(){this.composite?.dispose(),this.composite=qf(Zf,{tScene:{value:null},tDepth:{value:null},tBloom:{value:null},uInvViewProj:{value:new W},uPrevViewProj:{value:new W},uBlur:{value:.5},uBloom:{value:.1},tAO:{value:null},uAO:{value:0},uExposure:{value:1},uTint:{value:new H(1,1,1)},uSat:{value:1},uContrast:{value:1},uLift:{value:0},uFade:{value:0},uFadeCol:{value:new G(0,0,0)},uDesat:{value:0},uRed:{value:0},toneMappingExposure:{value:1}},{BLUR_SAMPLES:this.s.blurSamples})}setSize(e,t){this.w=e,this.h=t;let n=Math.max(2,Math.round(e*this.s.scale)),r=Math.max(2,Math.round(t*this.s.scale));this.sceneRT?.dispose(),this.ldrRT?.dispose();for(let e of[...this.bloomRTs,...this.upRTs])e.dispose();let i=new Sa(n,r);i.type=h,this.sceneRT=new en(n,r,{type:_,depthTexture:i,depthBuffer:!0,samples:this.s.msaa}),this.aoRT?.dispose(),this.aoBlurRT?.dispose(),this.aoRT=new en(Math.max(1,n>>1),Math.max(1,r>>1),{type:u,depthBuffer:!1}),this.aoBlurRT=new en(Math.max(1,n>>1),Math.max(1,r>>1),{type:u,depthBuffer:!1}),this.sceneRT.texture.colorSpace=We,this.ldrRT=new en(n,r,{type:u,depthBuffer:!1}),this.ldrRT.texture.minFilter=s,this.bloomRTs=[],this.upRTs=[];let a=n>>1,o=r>>1;for(let e=0;e<5;e++){let e={type:_,depthBuffer:!1};this.bloomRTs.push(new en(Math.max(1,a),Math.max(1,o),e)),this.upRTs.push(new en(Math.max(1,a),Math.max(1,o),e)),a>>=1,o>>=1}this.vhs.uniforms.uRes.value.set(e,t)}pass(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.renderer.render(this.qScene,this.qCam)}render(e,t,n){let r=this.renderer;r.setRenderTarget(this.sceneRT),r.render(e,t);let i=this.bloomRTs[0];this.bright.uniforms.tSrc.value=this.sceneRT.texture,this.bright.uniforms.uTexel.value.set(1/this.sceneRT.width,1/this.sceneRT.height),this.pass(this.bright,i);for(let e=1;e<this.bloomRTs.length;e++){let t=this.bloomRTs[e-1];this.down.uniforms.tSrc.value=t.texture,this.down.uniforms.uTexel.value.set(1/t.width,1/t.height),this.pass(this.down,this.bloomRTs[e])}let a=this.bloomRTs.length,o=this.bloomRTs[a-1].texture;for(let e=a-2;e>=0;e--){let t=e===a-2?this.bloomRTs[a-1]:this.upRTs[e+1];this.up.uniforms.tSrc.value=t.texture,this.up.uniforms.tPrev.value=this.bloomRTs[e].texture,this.up.uniforms.uTexel.value.set(1/t.width,1/t.height),this.up.uniforms.uMix.value=.9,this.pass(this.up,this.upRTs[e]),o=this.upRTs[e].texture}let s=this.composite.uniforms;if(this.s.ssao){let e=this.ssao.uniforms;e.tDepth.value=this.sceneRT.depthTexture,e.uProj.value.copy(t.projectionMatrix),e.uInvProj.value.copy(t.projectionMatrixInverse),this.pass(this.ssao,this.aoRT),this.aoBlur.uniforms.tSrc.value=this.aoRT.texture,this.aoBlur.uniforms.uTexel.value.set(1/this.aoRT.width,1/this.aoRT.height),this.pass(this.aoBlur,this.aoBlurRT),s.tAO.value=this.aoBlurRT.texture,s.uAO.value=.85}else s.uAO.value=0;let c=this.tmp.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),l=this.composite.uniforms;l.uInvViewProj.value.copy(c).invert(),l.uPrevViewProj.value.copy(this.prevVP),this.prevVP.copy(c),l.tScene.value=this.sceneRT.texture,l.tDepth.value=this.sceneRT.depthTexture,l.tBloom.value=o,l.uBlur.value=this.s.blur,l.uBloom.value=this.s.bloom,this.pass(this.composite,this.ldrRT);let u=this.vhs.uniforms;u.tSrc.value=this.ldrRT.texture,u.uTime.value=n,u.uAmt.value=this.s.vhs,u.uGrain.value=this.s.grain,u.uFxaa.value=this.s.msaa>0?0:1,this.pass(this.vhs,null)}resetHistory(e){this.prevVP.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse)}get size(){return[this.w,this.h]}};function np(e,t){let n=gd.uPower.value;if(n.w<.5)return 1;let r=Math.hypot(e-n.x,t-n.y),i=Math.min(1,Math.max(0,(r-n.z)/4));return 1-i*i*(3-2*i)}var rp=class{slots=[];flashlight;flashTarget=new An;near=[];emitY=2.6;constructor(e,t,n,r){for(let n=0;n<t;n++){let t=new zo(16777215,0,9,2);t.castShadow=!1,e.add(t),this.slots.push({light:t,key:-1,w:0,target:0})}let i=new Lo(16773596,0,22,.42,.55,1.8);i.castShadow=n,i.shadow.mapSize.set(r,r),i.shadow.bias=-8e-4,i.shadow.normalBias=.02,i.shadow.camera.near=.1,i.shadow.camera.far=22,i.shadow.radius=3,i.target=this.flashTarget,e.add(i,this.flashTarget),this.flashlight=i}dispose(e){for(let t of this.slots)e.remove(t.light),t.light.dispose();e.remove(this.flashlight,this.flashTarget),this.flashlight.dispose()}setLevel(e,t){this.emitY=e;for(let e of this.slots)e.light.color.copy(t)}update(e,t,n,r,i){let a=t.position,o=new H;t.getWorldDirection(o),this.near=e.lightsNear(a.x,a.z,16,this.near);let s=this.near.map(e=>{let t=e.x-a.x,n=e.z-a.z,r=Math.hypot(t,n),i=r>.01?(t*o.x+n*o.z)/r:1;return{l:e,s:(1+.6*Math.max(i,-.3))/(r*r+6)}}).sort((e,t)=>t.s-e.s).slice(0,this.slots.length),c=new Map(s.map(e=>[e.l.key,e.l]));for(let e of this.slots)e.key>=0&&!c.has(e.key)&&(e.target=0);for(let[e]of c){if(this.slots.some(t=>t.key===e))continue;let t=this.slots.find(e=>e.key<0)??this.slots.find(e=>e.target===0&&e.w<.05);t&&(t.key=e,t.w=0)}for(let e of this.slots){let t=c.get(e.key);if(t){e.target=1;let n=np(t.x,t.z);t.state===1&&(n*=Wf(t.chunk.cx,t.chunk.cz,r)),t.accent&&(n*=.8),e.light.position.set(t.x,this.emitY,t.z),e.light.userData.inten=n,t.accent?e.light.color.copy(gd.uAccentCol.value):e.light.color.copy(gd.uLightCol.value)}e.w+=(e.target-e.w)*Math.min(1,n*3),e.target===0&&e.w<.01&&(e.key=-1),e.light.intensity=e.key<0?0:e.w*(e.light.userData.inten??1)*6*i}}},ip=256,ap=class{points;pos=new Float32Array(ip*3);vel=new Float32Array(ip*3);life=new Float32Array(ip);next=0;flash;flashT=0;constructor(e){let t=new Nr;t.setAttribute(`position`,new vr(this.pos,3)),t.setAttribute(`life`,new vr(this.life,1));let n=new Fa({transparent:!0,depthWrite:!1,blending:2,vertexShader:`attribute float life; varying float vL; void main(){ vL = life; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = life > 0.0 ? (18.0 * life + 2.0) / -mv.z : 0.0; }`,fragmentShader:`varying float vL; void main(){ vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)); gl_FragColor = vec4(vec3(1.0, 0.85, 0.55) * (4.0 + 20.0 * vL) , a * vL); }`});this.points=new va(t,n),this.points.frustumCulled=!1,e.add(this.points),this.flash=new zo(11061503,0,6,2),e.add(this.flash)}burst(e,t,n,r,i,a=24){for(let o=0;o<a;o++){let a=this.next++%ip;this.pos.set([e+r*.02,t,n+i*.02],a*3);let o=1+Math.random()*2.5;this.vel.set([r*o+(Math.random()-.5)*2,Math.random()*2.2,i*o+(Math.random()-.5)*2],a*3),this.life[a]=.4+Math.random()*.6}this.flash.position.set(e+r*.2,t+.1,n+i*.2),this.flashT=.12}update(e){for(let t=0;t<ip;t++)this.life[t]<=0||(this.life[t]-=e*1.6,this.vel[t*3+1]-=9.8*e,this.pos[t*3]+=this.vel[t*3]*e,this.pos[t*3+1]+=this.vel[t*3+1]*e,this.pos[t*3+2]+=this.vel[t*3+2]*e,this.pos[t*3+1]<.01&&(this.pos[t*3+1]=.01,this.vel[t*3+1]*=-.3,this.vel[t*3]*=.5,this.vel[t*3+2]*=.5));this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.life.needsUpdate=!0,this.flashT-=e,this.flash.intensity=this.flashT>0?6*(Math.random()*.6+.4):0}},op=class{k;d;v=new H;x=new H;constructor(e=90,t=12){this.k=e,this.d=t}kick(e,t,n){this.v.x+=e,this.v.y+=t,this.v.z+=n}step(e){let t=-this.k*this.x.x-this.d*this.v.x,n=-this.k*this.x.y-this.d*this.v.y,r=-this.k*this.x.z-this.d*this.v.z;this.v.x+=t*e,this.v.y+=n*e,this.v.z+=r*e,this.x.addScaledVector(this.v,e)}};function sp(e,t){let n=Math.floor(e),r=e-n,i=e=>{let n=Math.sin((e+t*17.13)*127.1)*43758.5453;return n-Math.floor(n)-.5},a=r*r*(3-2*r);return i(n)*(1-a)+i(n+1)*a}var cp=class{camera;input;collider;pos=new H(0,0,0);vel=new H;yaw=0;pitch=0;eye=1.62;crouching=!1;sprinting=!1;stamina=1;fear=0;radius=.28;flashlight=!1;battery=1;onGround=!0;vy=0;alive=!0;frozen=!1;seated=null;onStep;onBump;phase=0;lastFoot=0;bobAmp=0;roll=0;strafe=0;breath=0;spring=new op(80,11);rotSpring=new op(60,9);time=0;landVel=0;distance=0;constructor(e,t,n){this.camera=e,this.input=t,this.collider=n}teleport(e,t,n=this.yaw){this.pos.set(e,0,t),this.vel.set(0,0,0),this.yaw=n,this.pitch=0}kick(e,t,n){this.rotSpring.kick(e,t,n)}update(e){this.time+=e;let t=this.input,n=t.pad(),r=.0032*J.sensitivity;this.frozen||(this.yaw-=t.mouseDX*r+(n?n.lx*e*2.6:0),this.pitch-=(t.mouseDY*r+(n?n.ly*e*2:0))*(J.invertY?-1:1),this.pitch=td(this.pitch,-1.45,1.45));let i=0,a=0;!this.frozen&&this.alive&&!this.seated&&((t.down(`KeyW`)||t.down(`ArrowUp`))&&--a,(t.down(`KeyS`)||t.down(`ArrowDown`))&&(a+=1),(t.down(`KeyA`)||t.down(`ArrowLeft`))&&--i,(t.down(`KeyD`)||t.down(`ArrowRight`))&&(i+=1),n&&(i+=n.mx,a+=n.mz));let o=Math.hypot(i,a);o>1&&(i/=o,a/=o);let s=!this.frozen&&(t.down(`KeyC`)||t.down(`ControlLeft`)||!!n?.crouch);this.crouching=s;let c=!this.crouching&&(t.down(`ShiftLeft`)||t.down(`ShiftRight`)||!!n?.sprint)&&a<0,l=this.stamina<.05;this.sprinting=c&&!l&&o>.1;let u=this.crouching?1.4:this.sprinting?5.4:2.9;this.stamina=this.sprinting?Math.max(0,this.stamina-e*.09):Math.min(1,this.stamina+e*(o>.1?.08:.16));let d=Math.sin(this.yaw),f=Math.cos(this.yaw),p=(i*f+a*d)*u,m=(-i*d+a*f)*u,h=rd(o>.1?14:16,e);this.vel.x=nd(this.vel.x,p,h),this.vel.z=nd(this.vel.z,m,h),this.onGround&&!this.frozen&&t.hit(`Space`)&&!this.crouching&&this.stamina>.1&&(this.vy=3.6,this.onGround=!1,this.stamina-=.08),this.onGround||(this.vy-=9.81*e,this.pos.y+=this.vy*e,this.pos.y<=0&&(this.pos.y=0,this.onGround=!0,this.landVel=-this.vy,this.spring.kick(0,-this.landVel*.25,0),this.onStep?.({foot:1,speed:this.landVel,loudness:td(this.landVel/4,.3,1),landing:!0}),this.vy=0));let g=this.pos.x,_=this.pos.z,v=this.pos.x+this.vel.x*e,y=this.pos.z+this.vel.z*e,b=this.collider.resolve(v,y,this.radius);if(this.pos.x=b.x,this.pos.z=b.z,b.hit){let e=-(this.vel.x*b.nx+this.vel.z*b.nz);e>2.2&&(this.onBump?.(e),this.spring.kick(-b.nx*e*.02,-.02*e,-b.nz*e*.02)),e>0&&(this.vel.x+=b.nx*e,this.vel.z+=b.nz*e)}let x=Math.hypot(this.pos.x-g,this.pos.z-_);this.distance+=x;let S=x/Math.max(e,1e-4),C=this.sprinting?1.35:this.crouching?.7:.9;this.onGround&&(this.phase+=x/C*Math.PI);let w=Math.floor(this.phase/Math.PI);if(w!==this.lastFoot&&this.onGround&&S>.25){this.lastFoot=w;let e=this.crouching?.12:this.sprinting?1:.4;this.onStep?.({foot:w%2==0?-1:1,speed:S,loudness:e})}S<.2&&(this.lastFoot=w);let T=J.headBob,E=td(S/2.9,0,1.6)*T;this.bobAmp=nd(this.bobAmp,E,rd(8,e));let D=this.phase,O=(Math.cos(D*2)*.5-.5)*.012*this.bobAmp,ee=Math.sin(D)*.008*this.bobAmp;this.strafe=nd(this.strafe,i,rd(6,e)),this.roll=nd(this.roll,-this.strafe*.008*T,rd(6,e));let k=td((1-this.stamina)*1.4,0,1);this.breath+=e*(1.2+k*1.6);let te=Math.sin(this.breath)*(.0025+k*.004)*T,A=Math.max(0,this.fear-.5)*.004*T,ne=sp(this.time*3,1)*A,j=sp(this.time*3,2)*A;this.spring.step(e),this.rotSpring.step(e);let M=this.seated?1.08:this.crouching?1.05:1.65;this.seated&&(this.pos.x+=(this.seated.x-this.pos.x)*Math.min(1,e*6),this.pos.z+=(this.seated.z-this.pos.z)*Math.min(1,e*6)),this.eye=nd(this.eye,M,rd(12,e));let N=this.camera;N.position.set(this.pos.x,this.pos.y+this.eye+O+te+this.spring.x.y,this.pos.z),N.position.x+=f*ee+this.spring.x.x,N.position.z+=-d*ee+this.spring.x.z;let re=new pn(this.pitch+ne+this.rotSpring.x.x,this.yaw+j+this.rotSpring.x.y,this.roll+this.rotSpring.x.z,`YXZ`);N.quaternion.setFromEuler(re);let ie=J.fov+(this.sprinting?3:0);N.fov=nd(N.fov,ie,rd(4,e)),N.updateProjectionMatrix()}get speed(){return Math.hypot(this.vel.x,this.vel.z)}},lp=class{ctx;master;buses={};reverb;reverbIn;duckGain;stingOut;buffers=new Map;loading=new Map;manifest={};ext=Vf();voices=new Set;losFn=null;listenerPos=new H;occlT=0;constructor(){let e=window.AudioContext||window.webkitAudioContext;this.ctx=new e({latencyHint:`interactive`});let t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=4,t.attack.value=.005,t.release.value=.2,this.master=this.ctx.createGain(),this.master.connect(t).connect(this.ctx.destination),this.duckGain=this.ctx.createGain(),this.duckGain.connect(this.master);for(let e of[`sfx`,`amb`,`ui`,`voice`]){let t=this.ctx.createGain();t.connect(e===`amb`?this.duckGain:this.master),this.buses[e]=t}let n=this.ctx.createDynamicsCompressor();n.threshold.value=-2,n.knee.value=0,n.ratio.value=20,n.attack.value=.001,n.release.value=.08,this.stingOut=this.ctx.createGain(),this.buses.sting=this.ctx.createGain(),this.buses.sting.connect(n).connect(this.stingOut).connect(this.ctx.destination),this.reverb=this.ctx.createConvolver(),this.reverbIn=this.ctx.createGain();let r=this.ctx.createGain();r.gain.value=.9,this.reverbIn.connect(this.reverb).connect(r).connect(this.buses.sfx),this.applyVolumes()}applyVolumes(){this.master.gain.value=J.master,this.buses.sfx.gain.value=J.sfx,this.buses.amb.gain.value=J.ambience,this.buses.voice.gain.value=J.voice,this.buses.ui.gain.value=.8,this.buses.sting.gain.value=J.sfx,this.stingOut.gain.value=J.master}duck(e,t=.15,n=1,r=2.5){let i=this.duckGain.gain,a=this.ctx.currentTime;i.cancelScheduledValues(a),i.setValueAtTime(i.value,a),i.linearRampToValueAtTime(1-e,a+t),i.setValueAtTime(1-e,a+t+n),i.linearRampToValueAtTime(1,a+t+n+r)}hush(e=.08){for(let t of this.voices)t.sting||t.stop(e)}async init(){this.manifest=await Bf()}resume(){this.ctx.state!==`running`&&this.ctx.resume()}variants(e){return this.manifest[e]??[e]}load(e){let t=this.buffers.get(e);if(t)return Promise.resolve(t);let n=this.loading.get(e);return n||(n=fetch(Df(`audio/${e}.${this.ext}`)).then(e=>e.arrayBuffer()).then(e=>this.ctx.decodeAudioData(e)).then(t=>(this.buffers.set(e,t),t)).catch(()=>null),this.loading.set(e,n)),n}setBuffer(e,t){let n=Array.isArray(t)?t:[t];this.manifest[e]=n.map((t,n)=>`${e}#${n}`),n.forEach((t,n)=>this.buffers.set(`${e}#${n}`,t))}async preload(e){await Promise.all(e.flatMap(e=>this.variants(e).map(e=>this.load(e))))}async setReverb(e){let t=await this.load(e);t&&(this.reverb.buffer=t)}play(e,t={}){let n=this.variants(e),r=n[t.variant??Math.floor(Math.random()*n.length)]??e,i=this.buffers.get(r);if(!i)return this.load(r),null;let a=this.ctx,o=a.createBufferSource();o.buffer=i,o.loop=!!t.loop,o.playbackRate.value=t.rate??1;let s=a.createGain(),c=t.gain??1;s.gain.value=c;let l=o,u;t.occlude&&(u=a.createBiquadFilter(),u.type=`lowpass`,u.frequency.value=2e4,l.connect(u),l=u),l.connect(s);let d,f=s;if(t.pos)d=a.createPanner(),d.panningModel=t.hrtf===!1?`equalpower`:`HRTF`,d.distanceModel=`inverse`,d.refDistance=t.refDistance??1.2,d.maxDistance=t.maxDistance??60,d.rolloffFactor=1.2,d.positionX.value=t.pos.x,d.positionY.value=t.pos.y,d.positionZ.value=t.pos.z,s.connect(d),f=d;else if(t.pan){let e=a.createStereoPanner();e.pan.value=t.pan,s.connect(e),f=e}if(f.connect(this.buses[t.bus??`sfx`]),t.reverb){let e=a.createGain();e.gain.value=t.reverb,f.connect(e).connect(this.reverbIn)}o.start();let p={src:o,gain:s,panner:d,filter:u,pos:t.pos?new H(t.pos.x,t.pos.y,t.pos.z):void 0,occlude:!!t.occlude,sting:t.bus===`sting`,baseGain:c,stop:(e=.05)=>{let t=a.currentTime;s.gain.cancelScheduledValues(t),s.gain.setValueAtTime(s.gain.value,t),s.gain.linearRampToValueAtTime(0,t+e);try{o.stop(t+e+.02)}catch{}},setPos:(e,t,n)=>{if(!d)return;let r=a.currentTime;d.positionX.setTargetAtTime(e,r,.03),d.positionY.setTargetAtTime(t,r,.03),d.positionZ.setTargetAtTime(n,r,.03),p.pos?.set(e,t,n)}};return this.voices.add(p),o.onended=()=>this.voices.delete(p),t.occlude&&p.pos&&this.occludeVoice(p),p}occludeVoice(e){if(!e.filter||!e.pos||!this.losFn)return;let t=this.listenerPos,n=this.losFn(t.x,t.z,e.pos.x,e.pos.z),r=this.ctx.currentTime;e.filter.frequency.setTargetAtTime(n?18e3:900,r,.08),e.gain.gain.setTargetAtTime(e.baseGain*(n?1:.55),r,.08)}updateListener(e,t){let n=this.ctx.listener,r=e.position;this.listenerPos.copy(r);let i=new H(0,0,-1).applyQuaternion(e.quaternion),a=new H(0,1,0).applyQuaternion(e.quaternion),o=this.ctx.currentTime;if(n.positionX?(n.positionX.setTargetAtTime(r.x,o,.01),n.positionY.setTargetAtTime(r.y,o,.01),n.positionZ.setTargetAtTime(r.z,o,.01),n.forwardX.setTargetAtTime(i.x,o,.01),n.forwardY.setTargetAtTime(i.y,o,.01),n.forwardZ.setTargetAtTime(i.z,o,.01),n.upX.setTargetAtTime(a.x,o,.01),n.upY.setTargetAtTime(a.y,o,.01),n.upZ.setTargetAtTime(a.z,o,.01)):(n.setPosition(r.x,r.y,r.z),n.setOrientation(i.x,i.y,i.z,a.x,a.y,a.z)),this.occlT+=t,this.occlT>.12){this.occlT=0;for(let e of this.voices)e.occlude&&this.occludeVoice(e)}}stopAll(){for(let e of this.voices)e.stop(.3)}};function up(e,t=6){let n=e.sampleRate,r=Math.floor(n*t),i=e.createBuffer(2,r,n);for(let e=0;e<2;e++){let a=i.getChannelData(e),o=0,s=0,c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=1234+e*777,_=()=>(g=g*1664525+1013904223>>>0)/4294967296*2-1;for(let i=0;i<r;i++){let r=_();o=.99886*o+r*.0555179,s=.99332*s+r*.0750759,c=.969*c+r*.153852,l=.8665*l+r*.3104856,u=.55*u+r*.5329522,d=-.7616*d-r*.016898;let g=(o+s+c+l+u+d+f+r*.5362)*.11;f=r*.115926,p+=(g-p)*.27,m=.983*(m+p-h),h=p;let v=i/n,y=.72+.18*Math.sin(2*Math.PI*1*v/t+e)+.1*Math.sin(2*Math.PI*3*v/t+2*e),b=.012*Math.sin(2*Math.PI*58*v)+.006*Math.sin(2*Math.PI*116*v+1);a[i]=m*y*.9+b}let v=Math.floor(n*.5);for(let e=0;e<v;e++){let t=e/v;a[e]=a[e]*t+a[r-v+e]*(1-t)}let y=a.slice(0,r-v);a.fill(0),a.set(y)}let a=r-Math.floor(n*.5),o=e.createBuffer(2,a,n);for(let e=0;e<2;e++)o.copyToChannel(i.getChannelData(e).subarray(0,a),e);return o}function dp(e,t=1){let n=e.sampleRate,r=Math.floor(n*.9),i=e.createBuffer(1,r,n),a=i.getChannelData(0),o=t*9301+49297,s=()=>(o=o*1664525+1013904223>>>0)/4294967296*2-1,c=[[142+t*9,1,7],[311+t*13,.55,11],[587+t*7,.3,16],[1043+t*21,.14,24]];for(let e=0;e<r;e++){let t=e/n,r=0;for(let[e,n,i]of c)r+=n*Math.sin(2*Math.PI*e*t)*Math.exp(-i*t);let i=s()*Math.exp(-t*300)*.6,o=Math.min(1,t/.002);a[e]=(r*.35+i)*o}return i}var fp=Object.freeze,pp=115792089237316195423570985008687907853269984665640564039457584007908834671663n,mp=115792089237316195423570985008687907852837564279074904382605163141518161494337n,hp=55066263022277343669578718895168534326250603453777594175500187360389116729240n,gp=32670510020758816978083085130507043184471273380659243275938904335757337482424n,_p=fp({p:pp,n:mp,h:1n,a:0n,b:7n,Gx:hp,Gy:gp}),vp=32,yp=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&e.BYTES_PER_ELEMENT===1,bp=(e,t,n=``)=>{if(yp(e)&&(t===void 0||e.length===t))return e;let r=yp(e),i=t===void 0?``:` of length ${t}`,a=r?`length=${e.length}`:`type=${typeof e}`,o=(n?`"${n}" `:``)+`expected Uint8Array`+i+`, got `+a;throw r?RangeError(o):TypeError(o)},xp=e=>Uint8Array.from(e),Sp=(e,t,n)=>xp(bp(e,n,t)),Cp=(e,t)=>e.toString(16).padStart(t,`0`),wp=e=>{let t=``;for(let n of bp(e))t+=Cp(n,2);return t},Tp=e=>{let t=`hex invalid`;if(typeof e!=`string`)throw TypeError(t);if(e.length%2||!/^[\da-f]*$/i.test(e))throw RangeError(t);let n=new Uint8Array(e.length/2);for(let t=0,r=0;t<n.length;t++,r+=2){let i=e.charCodeAt(r),a=e.charCodeAt(r+1);n[t]=((i&15)+(i>>6)*9)*16+(a&15)+(a>>6)*9}return n},Ep=()=>{let e=globalThis?.crypto?.subtle;if(e)return e;throw Error(`crypto.subtle must be defined, consider polyfill`)},Dp=(...e)=>{let t=0;for(let n of e)t+=bp(n).length;let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n},Op=(e=vp)=>{let t=globalThis?.crypto;if(typeof t?.getRandomValues!=`function`)throw Error(`crypto.getRandomValues must be defined, consider polyfill`);return t.getRandomValues(new Uint8Array(e))},kp=BigInt,Ap=(e,t,n,r=`bad number: out of range`)=>{if(typeof e!=`bigint`)throw TypeError(r);if(t<=e&&e<n)return e;throw RangeError(r)},Z=(e,t=pp)=>(e%=t)>=0n?e:t+e,jp=e=>Z(e,mp),Mp=(e,t)=>{if(e===0n)throw Error(`invert: expected non-zero number`);if(t<=1n)throw Error(`invert: expected modulus > 1, got `+t);let n=Z(e,t),r=t,i=0n,a=1n;for(;n!==0n;){let e=r/n,t=r-n*e,o=i-a*e;r=n,n=t,i=a,a=o}if(r!==1n)throw Error(`invert: does not exist`);return Z(i,t)},Np=e=>{let t=em[e];if(typeof t!=`function`)throw Error(`hashes.`+e+` not set`);return t},Pp=(e,t,n)=>bp(Np(e)(t,n),vp,`digest`),Fp=async(e,t,n)=>bp(await Np(e)(t,n),vp,`digest`),Ip=e=>{if(e instanceof Gp)return e;throw TypeError(`Point expected`)},Lp=`bad point: not on curve`,Rp=e=>Z(Z(e*e)*e+7n),zp=e=>Ap(e,0n,pp),Bp=e=>Ap(e,1n,pp),Vp=e=>Ap(e,1n,mp),Hp=e=>!(e&1n),Up=e=>Uint8Array.of(Hp(e)?2:3),Wp=e=>{let t=Rp(Bp(e)),n=1n;for(let e=t,r=115792089237316195423570985008687907853269984665640564039457584007908834671664n/4n;r>0n;r>>=1n)r&1n&&(n=n*e%pp),e=e*e%pp;if(Z(n*n)!==t)throw Error(`sqrt invalid`);return new Gp(e,Hp(n)?n:Z(-n),1n)},Gp=class e{static BASE;static ZERO;X;Y;Z;constructor(e,t,n){this.X=zp(e),this.Y=Bp(t),this.Z=zp(n),fp(this)}static CURVE(){return _p}static fromAffine(t){let{x:n,y:r}=t;return n===0n&&r===0n?qp:new e(n,r,1n)}static fromBytes(t){bp(t);let n=t.length,r=t[0],i=Xp(t,1,33);try{if(n===33&&(r===2||r===3)){let e=Wp(i);return r===3?e.negate():e}if(n===65&&r===4)return new e(i,Xp(t,33,65),1n).assertValidity()}catch{throw Error(Lp)}throw Error(Lp)}static fromHex(t){return e.fromBytes(Tp(t))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){let{X:t,Y:n,Z:r}=this,{X:i,Y:a,Z:o}=Ip(e);return Z(t*o)===Z(i*r)&&Z(n*o)===Z(a*r)}is0(){return this.Z===0n}negate(){return new e(this.X,Z(-this.Y),this.Z)}double(){return this.add(this)}add(t){let{X:n,Y:r,Z:i}=this,{X:a,Y:o,Z:s}=Ip(t),c=0n,l=0n,u=0n,d=0n,f=Z(7n*3n),p=Z(n*a),m=Z(r*o),h=Z(i*s),g=Z(n+r),_=Z(a+o);g=Z(g*_),_=Z(p+m),g=Z(g-_),_=Z(n+i);let v=Z(a+s);return _=Z(_*v),v=Z(p+h),_=Z(_-v),v=Z(r+i),l=Z(o+s),v=Z(v*l),l=Z(m+h),v=Z(v-l),d=Z(c*_),l=Z(f*h),d=Z(l+d),l=Z(m-d),d=Z(m+d),u=Z(l*d),m=Z(p+p),m=Z(m+p),h=Z(c*h),_=Z(f*_),m=Z(m+h),h=Z(p-h),h=Z(c*h),_=Z(_+h),p=Z(m*_),u=Z(u+p),p=Z(v*_),l=Z(g*l),l=Z(l-p),p=Z(g*m),d=Z(v*d),d=Z(d+p),new e(l,u,d)}subtract(e){return this.add(Ip(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return qp;if(Vp(e),e===1n)return this;if(this.equals(Kp))return Em(e).p;let n=qp,r=Kp,i=this;for(let a=0;t?a<256:e>0n;a++)e&1n?n=n.add(i):t&&(r=r.add(i)),i=i.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){let{X:e,Y:t,Z:n}=this;if(n===0n)return{x:0n,y:0n};if(n===1n)return{x:e,y:t};let r=Mp(n,pp);if(Z(n*r)!==1n)throw Error(`inverse invalid`);return{x:Z(e*r),y:Z(t*r)}}assertValidity(){let{x:e,y:t}=this.toAffine();if(Bp(e),Bp(t),Z(t*t)!==Rp(e))throw Error(Lp);return this}toBytes(e=!0){let{x:t,y:n}=this.assertValidity().toAffine(),r=Zp(t);return e?Dp(Up(n),r):Dp(Uint8Array.of(4),r,Zp(n))}toHex(e){return wp(this.toBytes(e))}},Kp=new Gp(hp,gp,1n),qp=new Gp(0n,1n,0n);Gp.BASE=Kp,Gp.ZERO=qp;var Jp=(e,t,n)=>Kp.multiply(t,!1).add(e.multiply(n,!1)).assertValidity(),Yp=e=>kp(`0x`+(wp(e)||`0`)),Xp=(e,t,n)=>Yp(e.subarray(t,n)),Zp=e=>Tp(Cp(Ap(e,0n,2n**256n),64)),Qp=e=>Ap(Yp(bp(e,vp,`secret key`)),1n,mp,`invalid secret key: outside of range`),$p=`SHA-256`,em={hmacSha256Async:async(e,t)=>{let n=Ep(),r=await n.importKey(`raw`,e,{name:`HMAC`,hash:$p},!1,[`sign`]);return new Uint8Array(await n.sign(`HMAC`,r,t))},hmacSha256:void 0,sha256Async:async e=>new Uint8Array(await Ep().digest($p,e)),sha256:void 0},tm=e=>{if(e=e===void 0?Op(48):e,bp(e),e.length<48||e.length>1024)throw RangeError(`expected 48-1024b`);return Zp(Z(Yp(e),mp-1n)+1n)},nm=e=>t=>{let n=tm(t);return{secretKey:n,publicKey:e(n)}},rm=e=>Uint8Array.from(`BIP0340/`+e,e=>e.charCodeAt(0)),im=(e,...t)=>{let n=Pp(`sha256`,rm(e));return Pp(`sha256`,Dp(n,n,...t))},am=(e,...t)=>Fp(`sha256Async`,rm(e)).then(e=>Fp(`sha256Async`,Dp(e,e,...t))),om=e=>{let t=Qp(e),{x:n,y:r}=Kp.multiply(t).assertValidity().toAffine();return{d:Hp(r)?t:jp(-t),px:Zp(n)}},sm=e=>jp(Yp(e)),cm=(...e)=>sm(im(`challenge`,...e)),lm=async(...e)=>sm(await am(`challenge`,...e)),um=e=>om(e).px,dm=nm(um),fm=(e,t,n)=>{let r=Sp(e,`message`),{px:i,d:a}=om(t);return{m:r,px:i,d:a,a:bp(n,vp)}},pm=e=>{let t=sm(e);if(t===0n)throw Error(`sign failed: k is zero`);let{px:n,d:r}=om(Zp(t));return{rx:n,k:r}},mm=(e,t,n,r)=>Dp(t,Zp(jp(e+n*r))),hm=`invalid signature produced`,gm=(e,t,n=Op(vp))=>{let{m:r,px:i,d:a,a:o}=fm(e,t,n),{rx:s,k:c}=pm(im(`nonce`,Zp(a^Yp(im(`aux`,o))),i,r)),l=mm(c,s,cm(s,i,r),a);if(!bm(l,r,i))throw Error(hm);return l},_m=async(e,t,n=Op(vp))=>{let{m:r,px:i,d:a,a:o}=fm(e,t,n),{rx:s,k:c}=pm(await am(`nonce`,Zp(a^Yp(await am(`aux`,o))),i,r)),l=mm(c,s,await lm(s,i,r),a);if(!await xm(l,r,i))throw Error(hm);return l},vm=(e,t)=>e instanceof Promise?e.then(t):t(e),ym=(e,t,n,r)=>{let i=bp(e,64,`signature`),a=bp(t,void 0,`message`),o=bp(n,vp,`publicKey`),s,c,l,u;try{s=Wp(Yp(o)),c=Bp(Xp(i,0,vp)),l=Vp(Xp(i,vp,64)),u=Dp(Zp(c),o,a)}catch{return!1}return vm(r(u),e=>{try{let{x:t,y:n}=Jp(s,l,jp(-e)).toAffine();return!(!Hp(n)||t!==c)}catch{return!1}})},bm=(e,t,n)=>ym(e,t,n,cm),xm=async(e,t,n)=>ym(e,t,n,lm),Sm=fp({keygen:dm,getPublicKey:um,sign:gm,verify:bm,signAsync:_m,verifyAsync:xm}),Cm=()=>{let e=[],t=Kp,n=t;for(let r=0;r<33;r++){n=t,e.push(n);for(let r=1;r<128;r++)n=n.add(t),e.push(n);t=n.double()}return e},wm=void 0,Tm=(e,t)=>{let n=t.negate();return e?n:t},Em=e=>{let t=wm||=Cm(),n=qp,r=Kp;for(let i=0;i<33;i++){let a=Number(e&255n);e>>=8n,a>128&&(a-=256,e+=1n);let o=i*128,s=o+Math.abs(a)-1,c=i%2!=0,l=a<0;a===0?r=r.add(Tm(c,t[o])):n=n.add(Tm(l,t[s]))}if(e!==0n)throw Error(`invalid wnaf`);return{p:n,f:r}},{floor:Dm,min:Om,sin:km}=Math,Am=`Trystero`,jm=(e,t)=>Array(e).fill(void 0).map(t),Mm=`0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`,Nm=e=>jm(e,()=>Mm[Dm(Math.random()*62)]??``).join(``),Pm=Nm(20),Fm=Promise.all.bind(Promise),Im=typeof window<`u`,{entries:Lm,fromEntries:Rm,keys:zm,values:Bm}=Object,Vm=()=>{},Hm=`candidate`,Um=e=>(e!==null&&clearTimeout(e),null),Wm=e=>Error(`${Am}: ${e}`),Gm=(e,t)=>e instanceof Error&&e.message?e.message:typeof e==`string`&&e?e:th(e??t),Km=(e,t)=>e instanceof Error?e:Wm(Gm(e,t)),qm=new TextEncoder,Jm=new TextDecoder,Ym=e=>qm.encode(e),Xm=e=>Jm.decode(e),Zm=e=>e.reduce((e,t)=>e+t.toString(16).padStart(2,`0`),``),Qm=(...e)=>e.join(`@`),$m=(e,t)=>{let n=[...e],r=()=>{let e=km(t++)*1e4;return e-Dm(e)},i=n.length;for(;i;){let e=Dm(r()*i--),t=n[i];n[i]=n[e],n[e]=t}return n},eh=(e,t,n,r=!1)=>e.relayConfig?.urls||(r?$m(t,rh(e.appId)):t).slice(0,e.relayConfig?.redundancy??n),th=JSON.stringify,nh=e=>{try{return JSON.parse(e)}catch{throw Wm(`failed to parse JSON: ${e}`)}},rh=(e,t=2**53-1)=>e.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%t,ih=3333,ah=6e4,oh={},sh=null,ch=null,lh=()=>{sh||=new Promise(e=>{ch=e}).finally(()=>{ch=null,sh=null})},uh=()=>{ch?.()},dh=(e,t,n)=>{let r={},i=!1,a=!1,o,s=Vm;r.isClosed=!1,r.ready=new Promise(e=>s=e);let c=()=>{if(r.isClosed)return;o=void 0,a=!1;let l=new WebSocket(e);l.onclose=()=>{if(r.isClosed||a)return;if(a=!0,sh){sh.then(c);return}let t=oh[e]??=ih;if(t>=ah){r.isClosed=!0;return}o=setTimeout(c,Math.random()*t),oh[e]=Om(t*2,ah)},l.onmessage=e=>t(String(e.data)),r.socket=l,r.url=l.url,l.onopen=()=>{let t=i;i=!0,s(r),oh[e]=ih,t&&n?.()},r.send=e=>{l.readyState===1&&l.send(e)}};return r.close=()=>{r.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),r.socket.close()},c(),r},fh=e=>{let t={},n=new WeakMap,r=e=>{let t=n.get(e);if(!t)throw Wm(`relay bookkeeping missing registration for relay client`);return t},i=()=>{let e={},t=t=>e[t]??={};return{forKey:t,forRelay:e=>t(r(e))}},a=(e,r)=>(t[e]=r,n.set(r,e),r);return{register:(e,n)=>t[e]||a(e,n()),keyOf:r,scoped:i,getSockets:()=>Rm(Lm(t).flatMap(([t,n])=>{let r=e(n);return r?[[t,r]]:[]}))}},ph=()=>{if(Im){let e=new AbortController;return addEventListener(`online`,uh,{signal:e.signal}),addEventListener(`offline`,lh,{signal:e.signal}),()=>e.abort()}return Vm},mh=`AES-GCM`,hh={},gh=e=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(e)))),_h=e=>{let t=atob(e);return new Uint8Array(t.length).map((e,n)=>t.charCodeAt(n)).buffer},vh=async(e,t)=>new Uint8Array(await crypto.subtle.digest(e,Ym(t))),yh=async e=>hh[e]??=Array.from(await vh(`SHA-1`,e)).map(e=>e.toString(36)).join(``),bh=async(e,t,n)=>crypto.subtle.importKey(`raw`,await crypto.subtle.digest({name:`SHA-256`},Ym(`${e}:${t}:${n}`)),{name:mh},!1,[`encrypt`,`decrypt`]),xh=async(e,t)=>Zm(await vh(`SHA-256`,`${Am}:${e}:${t}`)),Sh=`$`,Ch=`,`,wh=async(e,t)=>{let n=crypto.getRandomValues(new Uint8Array(16));return n.join(Ch)+Sh+gh(await crypto.subtle.encrypt({name:mh,iv:n},await e,Ym(t)))},Th=async(e,t)=>{let[n,r]=t.split(Sh);return Xm(await crypto.subtle.decrypt({name:mh,iv:new Uint8Array(n?.split(Ch).map(Number)??[])},await e,_h(r??``)))},Eh=57333,Dh=18e4,Oh=20,kh=class{makeOffer;pool=[];pooled=new Set;leased=new Map;recycling=new Set;cleanupTimer=null;active=!1;constructor(e){this.makeOffer=e}get isActive(){return this.active}warmup(){this.pool=[],this.pooled.clear(),jm(Oh,this.makeOffer).forEach(e=>this.push(e)),this.active=!0,this.cleanupTimer=setInterval(()=>{this.pool=this.pool.filter(e=>!e.isDead||(this.pooled.delete(e),!1))},Eh)}push(e){e.isDead||this.pooled.has(e)||this.leased.has(e)||(this.pool.push(e),this.pooled.add(e))}shift(e){let t=[];for(;t.length<e&&this.pool.length>0;){let e=this.pool.shift();if(!e)break;this.pooled.delete(e),t.push(e)}return t}claimLeased(e){let t=this.leased.get(e);t&&(Um(t),this.leased.delete(e))}recycle(e){if(!(e.isDead||this.recycling.has(e))){if(e.connection.remoteDescription){e.destroy();return}if(!this.active){e.destroy();return}this.recycling.add(e),e.setHandlers({connect:Vm,close:Vm,error:Vm}),e.getOffer(!0).then(t=>{if(!t||t.type!==`offer`||e.isDead||!this.active){e.destroy();return}this.push(e)}).catch(()=>e.destroy()).finally(()=>this.recycling.delete(e))}}reclaimLeased(e){let t=this.leased.get(e);t&&(Um(t),this.leased.delete(e),this.recycle(e))}lease(e){this.claimLeased(e),this.leased.set(e,setTimeout(()=>{this.leased.delete(e),this.recycle(e)},Dh))}checkout(e,t,n){let r=this.shift(e),i=Math.max(0,e-r.length);i>0&&r.push(...jm(i,this.makeOffer));let a=async(e,r=!1)=>{try{let r=await n(e);return t?(this.lease(e),{peer:e,offer:r,claim:()=>this.claimLeased(e),reclaim:()=>this.reclaimLeased(e)}):{peer:e,offer:r}}catch(t){if(this.claimLeased(e),this.pooled.delete(e),e.destroy(),!r)return a(this.makeOffer(),!0);throw t}};return Fm(r.map(e=>a(e)))}getOffers(e,t){return this.checkout(e,!0,t)}destroy(){this.active=!1,this.cleanupTimer&&=(clearInterval(this.cleanupTimer),null),this.pool.forEach(e=>e.destroy()),this.pool=[],this.pooled.clear(),this.leased.forEach((e,t)=>{Um(e),t.destroy()}),this.leased.clear(),this.recycling.forEach(e=>e.destroy()),this.recycling.clear()}},Ah=Wm(`incorrect password for overlapping room`),jh=(e,t,n)=>{let r=r=>vh(`SHA-256`,`${r}:${e}:${t}:${n}`).then(Zm),i=async(t,n,i)=>{if(!e)return;if(i){let e=Nm(36);await t({__trystero_pw:`challenge`,c:e});let{data:i}=await n();if(!i||typeof i!=`object`||i.__trystero_pw!==`response`||typeof i.h!=`string`)throw Ah;let a=await r(e);if(i.h!==a)throw Ah;return}let{data:a}=await n();if(!a||typeof a!=`object`||a.__trystero_pw!==`challenge`||typeof a.c!=`string`)throw Ah;await t({__trystero_pw:`response`,h:await r(a.c)})};return{run:i,compose:t=>e||t?async(e,n,r,a)=>{await i(n,r,a),await t?.(e,n,r,a)}:void 0}},Mh=e=>{let t=Gm(e,`unknown error`);return t.startsWith(`handshake `)?t:`handshake failed: ${t}`},Nh=({onPeerHandshake:e,onHandshakeError:t,handshakeTimeoutMs:n,sendHandshakeData:r,sendHandshakeReady:i,onActivate:a,onFailure:o})=>{let s={},c=(e,t)=>{let n=s[e];!n||t&&n.peer!==t||n.isActive||n.didLocalHandshakePass&&n.didReceiveRemoteReady&&(n.isActive=!0,n.handshakeTimer=Um(n.handshakeTimer),a(e,n.peer))},l=(e,n,r)=>{let i=s[e];if(!i||i.peer!==n)return;let a=Mh(r);t?.(e,a),o(e,n,Wm(a))},u=(e,t)=>{let n=s[e];n&&n.peer===t&&!n.isActive&&(n.didLocalHandshakePass=!0,i(``,e).catch(n=>l(e,t,Wm(`failed sending handshake readiness: ${Gm(n,`unknown send failure`)}`))),c(e,t))};return{addPeer:(e,t)=>{s[e]={peer:t,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(e,t)=>{let n=s[e];n&&(n.handshakeTimer=Um(n.handshakeTimer),n.pendingHandshakePayloads.length=0,n.handshakeWaiters.splice(0).forEach(e=>e.reject(t)),delete s[e])},canReceiveFromPeer:(e,t)=>{let n=s[e];return!!(n&&(n.isActive||t))},start:(t,i)=>{let a=s[t];if(!a||a.peer!==i)return;a.handshakeTimer=setTimeout(()=>l(t,i,Wm(`handshake timed out after ${n}ms`)),n);let o=async(e,n)=>{await r(e,t,n)},c=()=>new Promise((e,n)=>{let r=s[t];if(!r||r.peer!==i){n(Wm(`peer disconnected during handshake`));return}let a=r.pendingHandshakePayloads.shift();if(a){e(a);return}r.handshakeWaiters.push({resolve:e,reject:e=>n(e)})}),d=Pm<t;Promise.resolve(e?.(t,o,c,d)).then(()=>u(t,i)).catch(e=>l(t,i,Km(e,`handshake failed`)))},receiveHandshakeData:(e,t,n)=>{let r=s[t];if(!r||r.isActive)return;let i=n===void 0?{data:e}:{data:e,metadata:n},a=r.handshakeWaiters.shift();if(a){a.resolve(i);return}r.pendingHandshakePayloads.push(i)},receiveHandshakeReady:e=>{let t=s[e];t&&!t.isActive&&(t.didReceiveRemoteReady=!0,c(e))}}},Ph=15e3,Fh=5e3,Ih=`icegatheringstatechange`,Lh=`iceconnectionstatechange`,Rh=`offer`,zh=`answer`,Bh=/out of range/i,Vh=e=>e.replace(/ (\S+\.local) (\d+) typ host/g,` 127.0.0.1 $2 typ host`),Hh=(e,{trickleIce:t,rtcConfig:n,rtcPolyfill:r,turnConfig:i,_test_only_mdnsHostFallbackToLoopback:a})=>{let o=new(r??RTCPeerConnection)({iceServers:Uh.concat(i??[]),...n}),s={},c=[],l=[],u=t!==!1,d=[],f=[],p=!1,m=!1,h=null,g=null,_=!1,v=()=>g=Um(g),y=()=>{_||(_=!0,v(),s.close?.())},b=e=>{s.signal?s.signal(e):c.push(e)},x=e=>{let t=s.signal;s.signal=n=>{t?.(n),e(n)},c.length>0&&c.splice(0).forEach(e=>s.signal?.(e))},S=e=>a?Vh(e):e,C=e=>{if(!a||typeof e.candidate!=`string`)return e;let t=Vh(e.candidate);return t===e.candidate?e:{...e,candidate:t}},w=e=>({type:e.localDescription?.type??Rh,sdp:S(e.localDescription?.sdp??``)}),T=()=>{let e=o.remoteDescription?.sdp;return e?e.match(/a=ice-ufrag:([^\s]+)/)?.[1]??null:null},E=()=>(o.remoteDescription?.sdp?.match(/^m=/gm)??[]).length,D=e=>{if(!o.remoteDescription)return!1;let t=E();if(typeof e.sdpMLineIndex==`number`&&t>0&&e.sdpMLineIndex>=t)return!1;let n=T();return!(n&&e.usernameFragment&&e.usernameFragment!==n)},O=async e=>{try{return await o.addIceCandidate(e),!0}catch(t){if(t instanceof Error&&Bh.test(t.message)&&typeof e.sdpMLineIndex==`number`)return!1;throw t}},ee=async()=>{if(!o.remoteDescription||d.length===0)return;let e=d.splice(0),t=[];for(let n of e){if(!D(n)){t.push(n);continue}await O(n)||t.push(n)}t.length>0&&d.push(...t)},k=async e=>{if(D(e)){await O(e)||d.push(e);return}d.push(e)},te=e=>{e.binaryType=`arraybuffer`,e.bufferedAmountLowThreshold=65535,e.onmessage=e=>{let t=e.data;s.data?s.data(t):l.push(t)},e.onopen=()=>s.connect?.(),e.onclose=y,e.onerror=({error:e})=>s.error?.(Km(e,`data channel error`))},A=async e=>{let t=null;try{await Promise.race([new Promise(t=>{let n=()=>{e.iceGatheringState===`complete`&&(e.removeEventListener(Ih,n),t())};e.addEventListener(Ih,n),n()}),new Promise(e=>{t=setTimeout(e,Ph)})])}finally{Um(t)}return w(e)},ne=async()=>{let e=u?w(o):await A(o);return b(e),e};e?(h=o.createDataChannel(`data`),te(h)):o.ondatachannel=({channel:e})=>{h=e,te(e)};let j=async(e=!1)=>{if(o.connectionState!==`closed`)try{return p=!0,e&&(o.signalingState!==`stable`&&o.signalingState!==`closed`&&o.localDescription?.type===Rh&&await o.setLocalDescription({type:`rollback`}),typeof o.restartIce==`function`&&o.restartIce()),await o.setLocalDescription(e?await o.createOffer({iceRestart:!0}):void 0),await ne()}catch(e){s.error?.(Km(e,`failed to create local offer`))}finally{p=!1}};o.onnegotiationneeded=async()=>j(!1),o.onicecandidate=({candidate:e})=>{if(!u||!e)return;let t=C(typeof e.toJSON==`function`?e.toJSON():{candidate:e.candidate,sdpMid:e.sdpMid,sdpMLineIndex:e.sdpMLineIndex,usernameFragment:e.usernameFragment});b({type:Hm,sdp:JSON.stringify(t)})};let M=()=>{if(o.connectionState===`failed`||o.connectionState===`closed`||o.iceConnectionState===`failed`||o.iceConnectionState===`closed`){y();return}if(o.connectionState===`connected`||o.connectionState===`connecting`||o.iceConnectionState===`connected`||o.iceConnectionState===`completed`||o.iceConnectionState===`checking`){v();return}if(o.connectionState===`disconnected`||o.iceConnectionState===`disconnected`){g||=setTimeout(()=>{g=null,(o.connectionState===`disconnected`||o.iceConnectionState===`disconnected`)&&y()},Fh);return}};o.onconnectionstatechange=M,o.addEventListener(Lh,M),o.ontrack=e=>{let t=e.streams[0];if(t){if(!s.track&&!s.stream){f.push({track:e.track,stream:t});return}s.track?.(e.track,t),s.stream?.(t)}},o.onremovestream=e=>s.stream?.(e.stream);let N=e?new Promise(e=>x(t=>{t.type===Rh&&e(t)})):Promise.resolve();return e&&queueMicrotask(()=>{!p&&o.signalingState===`stable`&&!o.localDescription&&o.connectionState!==`closed`&&o.onnegotiationneeded?.(new Event(`negotiationneeded`))}),{created:Date.now(),connection:o,get channel(){return h},get isDead(){return o.connectionState===`closed`},getOffer:async(t=!1)=>{if(e)return t?j(!0):o.localDescription?.type===Rh?u?w(o):A(o):N},async signal(t){if(t.type===`candidate`){try{let e=JSON.parse(t.sdp);e&&typeof e==`object`&&await k(C(e))}catch(e){s.error?.(Km(e,`failed to parse remote candidate`))}return}if(h?.readyState!==`open`||t.sdp?.includes(`a=rtpmap`))try{let n={...t,sdp:S(t.sdp)};if(t.type===Rh){if(p||o.signalingState!==`stable`&&!m){if(e)return;await Fm([o.setLocalDescription({type:`rollback`}),o.setRemoteDescription(n)])}else await o.setRemoteDescription(n);return await ee(),await o.setLocalDescription(),await ne()}if(t.type===zh){m=!0;try{await o.setRemoteDescription(n),await ee()}finally{m=!1}}}catch(e){s.error?.(Km(e,`failed to apply remote signal`))}},sendData:e=>h?.send(e),destroy:()=>{v(),h?.close(),o.close(),p=!1,m=!1,y()},setHandlers:e=>{let{signal:t,...n}=e;Object.assign(s,n),s.data&&l.length>0&&l.splice(0).forEach(e=>s.data?.(e)),t&&x(t),(s.track||s.stream)&&f.length>0&&f.splice(0).forEach(({track:e,stream:t})=>{s.track?.(e,t),s.stream?.(t)})},offerPromise:N,addStream:e=>e.getTracks().forEach(t=>o.addTrack(t,e)),removeStream:e=>o.getSenders().filter(t=>t.track&&e.getTracks().includes(t.track)).forEach(e=>o.removeTrack(e)),addTrack:(e,t)=>o.addTrack(e,t),removeTrack:e=>{let t=o.getSenders().find(t=>t.track===e);t&&o.removeTrack(t)},replaceTrack:(e,t)=>{let n=o.getSenders().find(t=>t.track===e);if(n)return n.replaceTrack(t)}}},Uh=[...jm(3,(e,t)=>`stun:stun${t||``}.l.google.com:19302`),`stun:stun.cloudflare.com:3478`].map(e=>({urls:e})),Wh=Object.getPrototypeOf(Uint8Array),Gh=32,Kh=0,qh=32,Jh=34,Yh=35,Xh=36,Zh=16348,Qh=255,$h=65535,eg=`bufferedamountlow`,tg=`close`,ng=`error`,rg=1e4,ig=e=>e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength),ag=(e,t=rg)=>e.readyState!==`open`||e.bufferedAmount<=e.bufferedAmountLowThreshold?Promise.resolve(e.readyState===`open`):new Promise(n=>{let r=!1,i=null,a=t=>{r||(r=!0,e.removeEventListener(eg,o),e.removeEventListener(tg,s),e.removeEventListener(ng,s),Um(i),n(t))},o=()=>a(!0),s=()=>a(!1);if(e.addEventListener(eg,o),e.addEventListener(tg,s),e.addEventListener(ng,s),i=setTimeout(()=>a(!1),t),e.readyState!==`open`){a(!1);return}e.bufferedAmount<=e.bufferedAmountLowThreshold&&a(!0)}),og=({getPeer:e,getPeerIds:t,canReceiveFromPeer:n,throwIfAborted:r})=>{let i={},a={},o={},s={},c=(n,r,{includePending:i=!1}={})=>(n?Array.isArray(n)?n:[n]:t(i)).flatMap(t=>{let n=e(t,i);return n?[Promise.resolve(r(t,n))]:(console.warn(`${Am}: no peer with id ${t} found`),[])});return{makeInternalAction:(t,n={})=>{let o=a[t];if(i[t]&&o){let e=i[t].options;if(e.sendToPending!==!!n.sendToPending||e.receiveWhilePending!==!!n.receiveWhilePending)throw Wm(`action type "${t}" cannot be redefined`);return o}if(!t)throw Wm(`action type argument is required`);let l=Ym(t);if(l.byteLength>Gh)throw Wm(`action type string "${t}" (${l.byteLength}b) exceeds byte limit (${Gh}). Hint: choose a shorter name.`);let u={sendToPending:!!n.sendToPending,receiveWhilePending:!!n.receiveWhilePending},d=new Uint8Array(Gh);d.set(l);let f=0;return i[t]={onComplete:Vm,onProgress:Vm,setOnComplete:e=>{i[t].onComplete=e;let n=s[t];n?.length&&(delete s[t],n.forEach(({payload:t,peerId:n,metadata:r})=>e(t,n,r)))},setOnProgress:e=>{i[t].onProgress=e},send:async(t,n,i,a,o)=>{r(o);let s=typeof t;if(s===`undefined`)throw Wm(`action data cannot be undefined`);let l=s!==`string`,p=t instanceof Blob,m=p||t instanceof ArrayBuffer||t instanceof Wh,h=i!==void 0,g=m?ig(p?await t.arrayBuffer():t):Ym(l?th(t):t),_=h?Ym(th(i)):null,v=Math.ceil(g.byteLength/Zh)+ +!!h||1,y=jm(v,(e,t)=>{let n=t===v-1,r=!!(h&&t===0),i=new Uint8Array(Xh+(r?_?.byteLength??0:n?g.byteLength-Zh*(v-(h?2:1)):Zh));return i.set(d),i.set([f>>8,f&Qh],qh),i.set([Number(n)|Number(r)<<1|Number(m)<<2|Number(l)<<3],Jh),i.set([Math.round((t+1)/v*Qh)],Yh),i.set(h?r?_??new Uint8Array:g.subarray((t-1)*Zh,t*Zh):g.subarray(t*Zh,(t+1)*Zh),Xh),i});return f=f+1&$h,await Fm(c(n,async(t,n)=>{let{channel:s}=n,c=0;for(;c<v;){r(o);let l=y[c];if(!l)break;if(s&&s.bufferedAmount>s.bufferedAmountLowThreshold){let e=await ag(s);if(r(o),!e)break}let d=e(t,u.sendToPending);if(!d||d!==n)break;n.sendData(l),c++;let f=l[Yh]??Qh;a?.(f/Qh,t,i)}},{includePending:u.sendToPending})),[]},options:u},a[t]={send:i[t].send,onMessage:i[t].setOnComplete,onProgress:i[t].setOnProgress}},handleData:(e,t)=>{let r=new Uint8Array(t),a=Xm(r.subarray(Kh,qh)).replaceAll(`\0`,``),c=i[a];if(!n(e,!!c?.options.receiveWhilePending))return;let l=(r[qh]??0)<<8|(r[33]??0),u=r[Jh]??0,d=r[Yh]??0,f=r.subarray(Xh),p=!!(u&1),m=!!(u&2),h=!!(u&4),g=!!(u&8);o[e]??={},o[e][a]??={};let _=o[e][a][l]??={chunks:[]};if(m?_.meta=nh(Xm(f)):_.chunks.push(f),c?.onProgress(d/Qh,e,_.meta),!p)return;let v=new Uint8Array(_.chunks.reduce((e,t)=>e+t.byteLength,0));_.chunks.reduce((e,t)=>(v.set(t,e),e+t.byteLength),0),delete o[e][a][l];let y=h?v:g?nh(Xm(v)):Xm(v);if(c){c.onComplete(y,e,_.meta);return}(s[a]??=[]).push({payload:y,peerId:e,..._.meta===void 0?{}:{metadata:_.meta}})},clearPeer:e=>{delete o[e]}}},sg=500,cg=(e,t)=>{let n=Wm(t);return n.kind=e,n.name=e===`aborted`?`AbortError`:n.name,n},lg=e=>{if(e?.aborted)throw cg(`aborted`,`operation aborted`)},ug=e=>e&&typeof e==`object`&&!Array.isArray(e)&&typeof e.r==`string`?{r:e.r,...Object.hasOwn(e,`m`)?{m:e.m}:{}}:null,dg=e=>e&&typeof e==`object`&&!Array.isArray(e)&&typeof e.r==`string`?{r:e.r,...typeof e.e==`string`?{e:e.e}:{}}:null,fg=(e,t)=>t===void 0?e:{...e,metadata:t},pg=({getPeer:e,getPeerIds:t,canReceiveFromPeer:n})=>{let r={},i={},a=og({getPeer:e,getPeerIds:t,canReceiveFromPeer:n,throwIfAborted:lg}),o=a.makeInternalAction,s=a.handleData,c=e=>{let t=i[e];t&&(Um(t.timer),t.signal&&t.abortHandler&&t.signal.removeEventListener(`abort`,t.abortHandler),delete i[e])},l=(e,t)=>{Lm(i).forEach(([n,r])=>{r.peerId===e&&(c(n),r.reject(t))})},u=(e,t)=>{a.clearPeer(e),l(e,cg(`disconnected`,Gm(t,`peer disconnected`)))},d=o(`@_response`);return d.onMessage((e,t,n)=>{let r=dg(n);if(!r)return;let a=i[r.r];if(a&&a.peerId===t){if(c(r.r),r.e!==void 0){a.reject(cg(`rejected`,r.e));return}a.resolve(e)}}),{makeAction:(t,n)=>{if(n&&`onRequest`in n&&n.kind!==`request`)throw Wm(`request actions must use kind: "request"`);let a=n?.kind??`message`,s=o(t),l=r[t];if(l){if(l.kind!==a)throw Wm(`action type "${t}" cannot be redefined`);return l.action}let u={kind:a,action:null,pendingMessages:[],pendingRequests:[],onReceiveProgress:n?.onReceiveProgress??null},f=(e,t)=>e?(n,r)=>e(n,fg({peerId:r},t)):void 0,p=e=>{u.onReceiveProgress=e};if(s.onProgress((e,t,n)=>{let r=u.kind===`request`?ug(n):null;u.onReceiveProgress?.(e,fg({peerId:t},r?r.m:n))}),a===`message`){let e=n?.onMessage??null,i=()=>{if(!e)return;let t=e;u.pendingMessages.splice(0).forEach(({payload:e,peerId:n,metadata:r})=>{Promise.resolve().then(()=>t(e,fg({peerId:n},r))).catch(e=>console.error(`${Am} action handler error:`,e))})},a={send:async(e,t={})=>{await s.send(e,t.target,t.metadata,f(t.onProgress,t.metadata),t.signal)},get onMessage(){return e},set onMessage(t){e=t,i()},get onReceiveProgress(){return u.onReceiveProgress},set onReceiveProgress(e){p(e)}};return s.onMessage((t,n,r)=>{if(!e){u.pendingMessages.push(r===void 0?{payload:t,peerId:n}:{payload:t,peerId:n,metadata:r});return}let i=e;Promise.resolve().then(()=>i(t,fg({peerId:n},r))).catch(e=>console.error(`${Am} action handler error:`,e))}),u.action=a,r[t]=u,i(),a}let m=n?.onRequest??null,h=e=>{Um(e.timer);let t=u.pendingRequests.indexOf(e);t>-1&&u.pendingRequests.splice(t,1)},g=(e,t,n)=>{d.send(null,e,{r:t,e:Gm(n,`request failed`)})},_=(e,t)=>{h(e),Promise.resolve().then(()=>t(e.payload,{peerId:e.peerId,...e.metadata===void 0?{}:{metadata:e.metadata},signal:e.controller.signal})).then(async t=>{if(t===void 0)throw Wm(`request handler returned undefined`);await d.send(t,e.peerId,{r:e.requestId})}).catch(t=>g(e.peerId,e.requestId,t)).finally(()=>e.controller.abort())},v=()=>{m&&u.pendingRequests.slice().forEach(e=>_(e,m))},y=(e,t,n,r)=>{if(m){let i={payload:e,peerId:t,...n===void 0?{}:{metadata:n},requestId:r,controller:new AbortController,timer:null};_(i,m);return}let i={payload:e,peerId:t,...n===void 0?{}:{metadata:n},requestId:r,controller:new AbortController,timer:setTimeout(()=>{h(i),i.controller.abort(),g(t,r,`request handler unavailable`)},sg)};u.pendingRequests.push(i)},b=async(t,n)=>{let{target:r,metadata:a,onProgress:o,signal:l,timeoutMs:u}=n;if(lg(l),!e(r,!1))throw cg(`disconnected`,`no active peer with id ${r}`);let d=Nm(20),p=new Promise((e,t)=>{let n={peerId:r,resolve:e,reject:t,timer:null,...l===void 0?{}:{signal:l}},a=()=>{c(d),t(cg(`aborted`,`operation aborted`))};l&&(n.abortHandler=a,l.addEventListener(`abort`,a,{once:!0})),i[d]=n}).catch(e=>{throw e});try{await s.send(t,r,a===void 0?{r:d}:{r:d,m:a},f(o,a),l);let e=i[d];return e&&u!==void 0&&(e.timer=setTimeout(()=>{c(d),e.reject(cg(`timeout`,`request timed out`))},u)),await p}catch(e){throw c(d),e}},x={request:b,requestMany:async(e,t)=>(lg(t.signal),await Fm(t.targets.map(async n=>{try{let r={peerId:n,status:`fulfilled`,value:await b(e,{target:n,...t.metadata===void 0?{}:{metadata:t.metadata},...t.timeoutMs===void 0?{}:{timeoutMs:t.timeoutMs},...t.onProgress===void 0?{}:{onProgress:t.onProgress},...t.signal===void 0?{}:{signal:t.signal}})};return t.onResult?.(r),r}catch(e){let r=Km(e,`request failed`);if(r.kind===`aborted`||!r.kind)throw r;let i=r.kind===`timeout`?{peerId:n,status:`timeout`}:r.kind===`disconnected`?{peerId:n,status:`disconnected`}:{peerId:n,status:`rejected`,error:r};return t.onResult?.(i),i}}))),get onRequest(){return m},set onRequest(e){m=e,v()},get onReceiveProgress(){return u.onReceiveProgress},set onReceiveProgress(e){p(e)}};return s.onMessage((e,t,n)=>{let r=ug(n);r&&y(e,t,r.m,r.r)}),u.action=x,r[t]=u,v(),x},makeInternalAction:o,handleData:s,clearPeer:u}},mg=e=>e&&typeof e==`object`&&!Array.isArray(e)&&typeof e.k==`string`?{key:e.k,...typeof e.s==`string`?{streamId:e.s}:{},...typeof e.t==`string`?{trackId:e.t}:{},...Object.hasOwn(e,`m`)?{metadata:e.m}:{}}:null,hg=e=>t=>{let n=e.get(t);return n||(n=Nm(20),e.set(t,n)),n},gg=()=>{let e=new WeakMap,t=new WeakMap,n=new Map,r=new Map,i=new Map,a=new Map;return{getStreamKey:hg(e),getTrackKey:hg(t),rememberRemoteStream:(e,t,i)=>{n.set(e,t),i&&r.set(i,t)},getRemoteStream:(e,t)=>n.get(e)??(t?r.get(t):void 0),rememberRemoteTrack:(e,t,n,o,s)=>{let c={track:t,stream:n};i.set(e,c),o&&a.set(o,c),s&&r.set(s,n)},getRemoteTrack:(e,t)=>i.get(e)??(t?a.get(t):void 0),clearRemote:()=>{n.clear(),r.clear(),i.clear(),a.clear()}}},_g=({iterate:e,isActive:t,getSharedMediaPeer:n})=>{let r={},i={},a=gg(),o={onPeerStream:null,onPeerTrack:null},s=(e,r,i,a)=>{t(e)&&(n(e)?.__trysteroMedia?.rememberRemoteStream(r,i,typeof i.id==`string`?i.id:void 0),o.onPeerStream?.(i,e,a))},c=(e,r,i,a,s)=>{t(e)&&(n(e)?.__trysteroMedia?.rememberRemoteTrack(r,i,a,typeof i.id==`string`?i.id:void 0,typeof a.id==`string`?a.id:void 0),o.onPeerTrack?.(i,a,e,s))},l=(t,n,r,i,a,o={})=>{let s={k:n,...o,...r===void 0?{}:{m:r}};return e(t,async(e,t)=>{await i(s,e),a(t)})};return{addStream:(e,t,n)=>l(t.target,a.getStreamKey(e),t.metadata,n,t=>t.addStream(e),{s:e.id}),removeStream:(t,n)=>{e(n,(e,n)=>n.removeStream(t))},addTrack:(e,t,n,r)=>l(n.target,a.getTrackKey(e),n.metadata,r,n=>n.addTrack(e,t),{s:t.id,t:e.id}),removeTrack:(t,n)=>{e(n,(e,n)=>n.removeTrack(t))},replaceTrack:(e,t,n,r)=>l(n.target,a.getTrackKey(t),n.metadata,r,n=>n.replaceTrack(e,t),{t:e.id}),receiveStreamMeta:(e,i)=>{if(!t(i))return;let a=mg(e);if(!a)return;let o=n(i)?.__trysteroMedia?.getRemoteStream(a.key,a.streamId);if(o){s(i,a.key,o,a.metadata);return}(r[i]??=[]).push(a)},receiveTrackMeta:(e,r)=>{if(!t(r))return;let a=mg(e);if(!a)return;let o=n(r)?.__trysteroMedia?.getRemoteTrack(a.key,a.trackId);if(o){c(r,a.key,o.track,o.stream,a.metadata);return}(i[r]??=[]).push(a)},receiveRemoteStream:(e,n)=>{if(!t(e))return;let i=r[e]?.shift();i&&s(e,i.key,n,i.metadata)},receiveRemoteTrack:(e,n,r)=>{if(!t(e))return;let a=i[e]?.shift();a&&c(e,a.key,n,r,a.metadata)},clearPeer:e=>{delete r[e],delete i[e]},get onPeerStream(){return o.onPeerStream},set onPeerStream(e){o.onPeerStream=e},get onPeerTrack(){return o.onPeerTrack},set onPeerTrack(e){o.onPeerTrack=e}}},vg=`beforeunload`,yg=1e4,bg=e=>`@_`+e,xg=new Set,Sg=()=>xg.forEach(e=>e()),Cg=e=>(xg.add(e),xg.size===1&&addEventListener(vg,Sg),()=>{xg.delete(e),xg.size||removeEventListener(vg,Sg)}),wg=(e,t,n,{onPeerHandshake:r,onHandshakeError:i,handshakeTimeoutMs:a=yg,isPassive:o=!1}={})=>{let s={},c={},l={},u={onPeerJoin:null,onPeerLeave:null},d=Vm,f=null,p=(e,t,{includePending:n=!1}={})=>(e?Array.isArray(e)?e:[e]:zm(n?s:c)).flatMap(e=>{let r=n?s[e]:c[e];return r?[Promise.resolve(t(e,r))]:(console.warn(`${Am}: no peer with id ${e} found`),[])}),m=_g({iterate:(e,t)=>p(e,(e,n)=>t(e,n)),isActive:e=>!!c[e],getSharedMediaPeer:e=>s[e]??null}),h=pg({getPeer:(e,t)=>(t?s:c)[e],getPeerIds:e=>zm(e?s:c),canReceiveFromPeer:(e,t)=>!!f?.canReceiveFromPeer(e,t)}),g=h.makeInternalAction,_=h.handleData,v=h.makeAction,y=(e,t=Wm(`peer disconnected`))=>{let n=Km(t,`peer disconnected`);f?.clearPeer(e,n),delete s[e],delete c[e],h.clearPeer(e,n),l[e]?.splice(0).forEach(e=>e.reject(n)),delete l[e],m.clearPeer(e)},b=(e,n,r)=>{let i=s[e];if(!i||n&&i!==n)return;let a=!!c[e];y(e,r),i.destroy(),a&&u.onPeerLeave?.(e),t(e)},x=async()=>{await D.send(``),await new Promise(e=>setTimeout(e,99)),Lm(s).forEach(([e,t])=>{t.destroy(),y(e,Wm(`room left`))}),d(),n()},S=g(bg(`ping`)),C=g(bg(`pong`)),w=g(bg(`signal`)),T=g(bg(`stream`)),E=g(bg(`track`)),D=g(bg(`leave`),{sendToPending:!0,receiveWhilePending:!0}),O=g(bg(`hsdata`),{sendToPending:!0,receiveWhilePending:!0}),ee=g(bg(`hsready`),{sendToPending:!0,receiveWhilePending:!0});return f=Nh({...r===void 0?{}:{onPeerHandshake:r},...i===void 0?{}:{onHandshakeError:i},handshakeTimeoutMs:a,sendHandshakeData:O.send,sendHandshakeReady:ee.send,onActivate:(e,t)=>{c[e]=t,u.onPeerJoin?.(e)},onFailure:(e,t,n)=>b(e,t,n)}),S.onMessage((e,t)=>C.send(``,t)),C.onMessage((e,t)=>{let n=l[t];(n?.shift())?.resolve(),n&&!n.length&&delete l[t]}),w.onMessage((e,t)=>{c[t]&&s[t]?.signal(e)}),T.onMessage((e,t)=>m.receiveStreamMeta(e,t)),E.onMessage((e,t)=>m.receiveTrackMeta(e,t)),D.onMessage((e,t)=>b(t,void 0,Wm(`peer left room`))),O.onMessage((e,t,n)=>f?.receiveHandshakeData(e,t,n)),ee.onMessage((e,t)=>f?.receiveHandshakeReady(t)),e((e,t)=>{let n=s[t];if(n){if(n===e)return;n.destroy(),y(t,Wm(`peer replaced`))}s[t]=e,f?.addPeer(t,e),e.setHandlers({data:e=>_(t,e),stream:e=>m.receiveRemoteStream(t,e),track:(e,n)=>m.receiveRemoteTrack(t,e,n),signal:e=>{c[t]&&w.send(e,t)},close:()=>b(t,e,Wm(`peer disconnected`)),error:n=>{console.error(`${Am} peer error:`,n),b(t,e,n)}}),f?.start(t,e)}),Im&&(d=Cg(()=>x().catch(Vm))),{makeAction:v,leave:x,ping:async e=>{if(!c[e])throw Wm(`no active peer with id ${e}`);let t=Date.now();return await new Promise((t,n)=>{let r=l[e]??=[],i=()=>{let t=l[e];if(!t)return;let n=t.indexOf(a);n>-1&&t.splice(n,1),t.length||delete l[e]},a={resolve:()=>{i(),t()},reject:e=>{i(),n(e)}};r.push(a),S.send(``,e).catch(e=>a.reject(Km(e,`peer disconnected`)))}),Date.now()-t},isPassive:()=>o,getPeers:()=>Rm(Lm(c).map(([e,t])=>[e,t.connection])),addStream:(e,t={})=>m.addStream(e,t,T.send),removeStream:(e,t={})=>{m.removeStream(e,t.target)},addTrack:(e,t,n={})=>m.addTrack(e,t,n,E.send),removeTrack:(e,t={})=>{m.removeTrack(e,t.target)},replaceTrack:(e,t,n={})=>m.replaceTrack(e,t,n,E.send),get onPeerJoin(){return u.onPeerJoin},set onPeerJoin(e){u.onPeerJoin=e,e&&zm(c).forEach(t=>e(t))},get onPeerLeave(){return u.onPeerLeave},set onPeerLeave(e){u.onPeerLeave=e},get onPeerStream(){return m.onPeerStream},set onPeerStream(e){m.onPeerStream=e},get onPeerTrack(){return m.onPeerTrack},set onPeerTrack(e){m.onPeerTrack=e}}},Tg=1,Eg=2,Dg=(e,t)=>{let n=Ym(e),r=new Uint8Array(3+n.byteLength+t.byteLength);return r[0]=Tg,r[1]=n.byteLength>>>8&255,r[2]=n.byteLength&255,r.set(n,3),r.set(t,3+n.byteLength),r},Og=(e,t)=>{let n=Ym(e),r=new Uint8Array(4+n.byteLength);return r[0]=Eg,r[1]=Number(t),r[2]=n.byteLength>>>8&255,r[3]=n.byteLength&255,r.set(n,4),r},kg=e=>{let t=new Uint8Array(e);if(t.byteLength<3)return null;if(t[0]===Tg){let e=(t[1]??0)<<8|(t[2]??0),n=3+e;return e<=0||t.byteLength<n?null:{type:`room`,roomToken:Xm(t.subarray(3,n)),payload:t.subarray(n).slice().buffer}}if(t[0]!==Eg||t.byteLength<4)return null;let n=(t[2]??0)<<8|(t[3]??0),r=4+n;return n<=0||t.byteLength<r?null:{type:`presence`,roomToken:Xm(t.subarray(4,r)),isPresent:t[1]===1}},Ag=e=>{let{connection:t,channel:n}=e;return e.isDead||t.connectionState===`closed`||t.connectionState===`failed`||t.iceConnectionState===`closed`||t.iceConnectionState===`failed`||n?.readyState===`closing`||n?.readyState===`closed`},jg=e=>{if(Ag(e))return`stale`;let{channel:t}=e;return!t||t.readyState!==`open`?`transient`:`live`},Mg=class{byApp={};roomPresenceHandlers={};getMap(e){return this.byApp[e]??={}}get(e,t){return this.byApp[e]?.[t]}isPeerStale(e){return Ag(e)}getHealth(e){return this.isPeerStale(e)?`stale`:`live`}setRoomPresenceHandler(e,t){return this.roomPresenceHandlers[e]=t,()=>{this.roomPresenceHandlers[e]===t&&delete this.roomPresenceHandlers[e]}}sendRoomPresence(e,t,n){e.isClosing||e.peer.isDead||e.peer.sendData(Og(t,n))}clear(e,t,{destroyPeer:n}){let r=this.byApp[e],i=r?.[t];if(!i||i.isClosing)return;i.idleTimer=Um(i.idleTimer),i.isClosing=!0,n&&!i.peer.isDead&&i.peer.destroy();let a=Bm(i.bindings);i.bindings={},i.bindingsByToken={},i.controlRoomId=null,delete r[t],a.forEach(e=>{e.handlers.close?.(),e.pendingData.length=0,e.pendingSendData.length=0,e.pendingTracks.length=0}),i.media.clearRemote(),i.pendingDataByToken.clear(),i.remoteRoomTokens.clear(),zm(r).length===0&&delete this.byApp[e]}register(e,t,n,r){let i=this.getMap(e),a=i[t];if(a){if(a.idleTimer=Um(a.idleTimer),a.peer===n)return a;this.clear(e,t,{destroyPeer:!0})}let o={appId:e,peerId:t,peer:n,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:gg(),idleMs:r,isClosing:!1};return n.setHandlers({data:e=>this.dispatchData(o,e),signal:e=>this.dispatchSignal(o,e),close:()=>this.clear(e,t,{destroyPeer:!1}),error:n=>{console.error(`${Am} peer error:`,n),this.clear(e,t,{destroyPeer:!1})},track:(e,t)=>this.dispatchTrack(o,e,t)}),i[t]=o,o}bind(e,t,n,{onDetach:r}){let i=n.bindings[e];if(i)return n.idleTimer=Um(n.idleTimer),{proxy:i.proxy,isNew:!1};let a={roomId:e,roomToken:null,roomTokenPromise:t,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:Vm,proxy:{}},o=()=>{n.bindings[e]&&(this.pruneRoomOwnership(n,e),delete n.bindings[e],a.roomToken&&n.bindingsByToken[a.roomToken]===a&&delete n.bindingsByToken[a.roomToken],n.controlRoomId===e&&(n.controlRoomId=zm(n.bindings)[0]??null),r(),this.scheduleIdleTimer(n))},s={created:n.peer.created,get connection(){return n.peer.connection},get channel(){return n.peer.channel},get isDead(){return n.peer.isDead},getOffer:e=>n.peer.getOffer(e),signal:e=>n.peer.signal(e),sendData:e=>{if(!a.roomToken){a.pendingSendData.push(e);return}n.peer.sendData(Dg(a.roomToken,e))},destroy:()=>o(),setHandlers:e=>{let{signal:t,...n}=e;Object.assign(a.handlers,n),t&&(a.handlers.signal=t),this.flushBindingQueues(a)},offerPromise:n.peer.offerPromise,addStream:t=>{let r=n.streamOwners.get(t)??new Set,i=r.size===0;r.add(e),n.streamOwners.set(t,r),i&&n.peer.addStream(t)},removeStream:t=>{let r=n.streamOwners.get(t);r&&(r.delete(e),r.size===0&&(n.streamOwners.delete(t),n.peer.removeStream(t)))},addTrack:(t,r)=>{let i=n.trackOwners.get(t)??{stream:r,rooms:new Set},a=i.rooms.size===0;return i.stream=r,i.rooms.add(e),n.trackOwners.set(t,i),a?n.peer.addTrack(t,r):n.peer.connection.getSenders().find(e=>e.track===t)??n.peer.addTrack(t,r)},removeTrack:t=>{let r=n.trackOwners.get(t);r&&(r.rooms.delete(e),r.rooms.size===0&&(n.trackOwners.delete(t),n.peer.removeTrack(t)))},replaceTrack:(e,t)=>{let r=n.trackOwners.get(e);if(r){n.trackOwners.delete(e);let i=n.trackOwners.get(t)??{stream:r.stream,rooms:new Set};r.rooms.forEach(e=>i.rooms.add(e)),n.trackOwners.set(t,i)}return n.peer.replaceTrack(e,t)},__trysteroMedia:n.media};return a.proxy=s,a.detach=o,n.bindings[e]=a,n.controlRoomId??=e,n.idleTimer=Um(n.idleTimer),t.then(t=>{if(n.isClosing||n.bindings[e]!==a)return;a.roomToken=t,n.bindingsByToken[t]=a;let r=n.pendingDataByToken.get(t);r?.length&&(a.pendingData.push(...r),n.pendingDataByToken.delete(t)),a.pendingSendData.splice(0).forEach(e=>n.peer.sendData(Dg(t,e))),this.flushBindingQueues(a)}),{proxy:s,isNew:!0}}pruneRoomOwnership(e,t){e.streamOwners.forEach((n,r)=>{n.delete(t),n.size===0&&(e.streamOwners.delete(r),e.peer.removeStream(r))}),e.trackOwners.forEach((n,r)=>{n.rooms.delete(t),n.rooms.size===0&&(e.trackOwners.delete(r),e.peer.removeTrack(r))})}scheduleIdleTimer(e){e.isClosing||zm(e.bindings).length>0||(e.idleTimer=Um(e.idleTimer),e.idleTimer=setTimeout(()=>{let t=this.byApp[e.appId]?.[e.peerId];!t||zm(t.bindings).length>0||this.clear(e.appId,e.peerId,{destroyPeer:!0})},e.idleMs))}getSignalBinding(e){if(e.controlRoomId){let t=e.bindings[e.controlRoomId];if(t?.handlers.signal)return t}let t=Bm(e.bindings).find(e=>!!e.handlers.signal);return t?(e.controlRoomId=t.roomId,t):null}flushBindingQueues(e){let{handlers:t}=e;t.data&&e.pendingData.length>0&&e.pendingData.splice(0).forEach(e=>t.data?.(e)),(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:e,stream:n})=>{t.track?.(e,n),t.stream?.(n)})}dispatchData(e,t){let n=kg(t);if(!n)return;if(n.type===`presence`){n.isPresent?e.remoteRoomTokens.add(n.roomToken):e.remoteRoomTokens.delete(n.roomToken),this.roomPresenceHandlers[e.appId]?.(e.peerId,n.roomToken,n.isPresent);return}let r=e.bindingsByToken[n.roomToken];if(!r){let t=e.pendingDataByToken.get(n.roomToken)??[];t.push(n.payload),e.pendingDataByToken.set(n.roomToken,t);return}r.handlers.data?r.handlers.data(n.payload):r.pendingData.push(n.payload)}dispatchSignal(e,t){this.getSignalBinding(e)?.handlers.signal?.(t)}dispatchTrack(e,t,n){Bm(e.bindings).forEach(e=>{if(e.handlers.track||e.handlers.stream){e.handlers.track?.(t,n),e.handlers.stream?.(n);return}e.pendingTracks.push({track:t,stream:n})})}},Ng=23333,Pg=12,Fg=7533,Ig=23333,Lg=`__legacy__`,Rg=`offer-placeholder`,zg=[`offer`,`answer`,`candidate`],Bg=e=>{if(typeof e==`string`)try{let t=nh(e);return t&&typeof t==`object`?t:null}catch{return null}return e&&typeof e==`object`?e:null},Vg=(e,t)=>typeof e[t]==`string`&&e[t]?e[t]:void 0,Hg=e=>zg.some(t=>t in e&&(typeof e[t]!=`string`||e[t]===``)),Ug=(e,t,n,r,i,a)=>{e.toCipher(t).then(t=>{!e.isLeaving()&&a()&&r(n,th(i(t.sdp)))})},Wg=()=>({status:`idle`,offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,connectionErrorReported:!1,pendingCandidates:{}}),Gg=e=>[...e.turnConfig??[],...e.rtcConfig?.iceServers??[]].some(({urls:e})=>(Array.isArray(e)?e:[e]).some(e=>/^turns?:/i.test(e))),Kg=(e,t)=>`could not connect to peer ${e} after exchanging SDP; ${Gg(t)?`check that your TURN server URLs and credentials are reachable by both peers`:`configure TURN servers with turnConfig or rtcConfig.iceServers`}`,qg=(e,t,n)=>{e.isLeaving()||t.connectedPeer||t.connectionErrorReported||(t.connectionErrorReported=!0,e.onJoinError?.({error:Kg(n,e.config),appId:e.appId,peerId:n,roomId:e.roomId}))},Jg=(e,t)=>e[t]??=Wg(),Yg=e=>{e.status=e.connectedPeer?`connected`:e.answeringPeer?`answering`:e.offerPeer||e.offerRelays.some(Boolean)?`offering`:`idle`},Xg=(e,t)=>{e.answeringPeer===t&&(e.answeringExpiryTimer=Um(e.answeringExpiryTimer),e.answeringPeer=null,e.answerSent=!1,Yg(e))},Zg=(e,t,n)=>{e.connectedPeer&&(e.connectedPeer.isDead||e.connectedPeer.destroy(),e.connectedPeer=null,e.connectedPeerUnhealthySinceMs=null,Yg(e))},Qg=(e,t)=>{e.offerRelayTimers[t]=Um(e.offerRelayTimers[t]),e.offerRelays[t]&&(e.offerRelays[t]=void 0,Yg(e))},$g=(e,t)=>{e?.offerRelays[t]===Rg&&Qg(e,t)},e_=e=>{if(e.isDead||e.connection.connectionState===`closed`)return!0;try{return!!e.connection.remoteDescription}catch{return!0}},t_=(e,t)=>{let n=e.offerAnswered;e.offerExpiryTimer=Um(e.offerExpiryTimer),e.offerInitPromise=null,e.offerRelays.forEach((t,n)=>Qg(e,n)),e.offerRelays=[],e.offerSignalRelays=[],e.offerRelayTimers=[],e.offerSignalBacklog=[],e.offerPeer&&e.offerPeer!==e.connectedPeer&&(n||e_(e.offerPeer)?e.offerPeer.isDead||e.offerPeer.destroy():t.recycle(e.offerPeer)),e.offerPeer=null,e.offerId=null,e.offerSdp=null,e.offerAnswered=!1,e.connectionErrorReported=!1,Yg(e)},n_=(e,t,n,r)=>{Um(t.answeringExpiryTimer),t.answeringExpiryTimer=setTimeout(()=>{let t=e.peerStates[n];t&&!t.connectedPeer&&t.answeringPeer===r&&(t.answerSent&&qg(e,t,n),r.destroy(),Xg(t,r),e.checkDeactivate())},Ig)},r_=async(e,t,n)=>{let r=n?[n,Lg]:[Lg];for(let n of r){let r=e.pendingCandidates[n];if(r?.length){delete e.pendingCandidates[n];for(let e of r)await t.signal(e)}}},i_=(e,t,n,r=Eh)=>{Um(t.offerExpiryTimer);let i=t.offerId;t.offerExpiryTimer=setTimeout(()=>{let t=e.peerStates[n];t&&!t.connectedPeer&&t.offerId===i&&(t.offerAnswered&&qg(e,t,n),t_(t,e.offerPool),e.checkDeactivate())},r)},a_=(e,t,n,r)=>t.offerPeer&&t.offerId&&t.offerSdp?Promise.resolve({peer:t.offerPeer,offer:t.offerSdp,offerId:t.offerId}):(t.offerInitPromise||=(async()=>{let i=(await e.offerPool.checkout(1,!1,e.encryptOffer))[0];if(!i)throw Wm(`failed to allocate offer peer`);let{peer:a,offer:o}=i;t.offerPeer=a,t.offerId=Nm(Pg),t.offerSdp=o,t.offerAnswered=!1,t.connectionErrorReported=!1,t.offerSignalBacklog=[],Yg(t);let s=()=>{t.offerPeer===a&&!t.connectedPeer&&(t.offerAnswered&&qg(e,t,n),t_(t,e.offerPool)),e.disconnectPeer(a,n),e.checkDeactivate()};return a.setHandlers({connect:()=>e.connectPeer(a,n,r),signal:e=>{t.offerPeer===a&&(t.offerSignalBacklog.push(e),t.offerSignalRelays.forEach(t=>t?.(e)))},close:s,error:s}),i_(e,t,n),{peer:a,offer:o,offerId:t.offerId}})().finally(()=>t.offerInitPromise=null),t.offerInitPromise),o_=async(e,t,n,r,i)=>{if(r){e.attachSharedPeerToRoom(n,r);return}let a=e.peerStates[n];if(!a||a.connectedPeer||a.answeringPeer||a.offerAnswered){$g(a,t);return}if(a.offerRelays[t]!==Rg)return;let[o,s]=await Fm([yh(Qm(e.rootTopicPlaintext,n)),a_(e,a,n,t)]);if(e.isLeaving())return;if(a.connectedPeer||a.answeringPeer||a.offerAnswered||a.offerRelays[t]!==Rg){$g(a,t);return}a.offerRelayTimers[t]=Um(a.offerRelayTimers[t]),a.offerRelays[t]=!0,Yg(a),a.offerRelayTimers[t]=setTimeout(()=>u_(e,n,t),(e.announceIntervals[t]??e.announceIntervalMs)*.9);let c=!1;a.offerSignalRelays[t]=t=>{c&&(e.isLeaving()||a.connectedPeer||a.offerPeer!==s.peer||a.offerId!==s.offerId||t.type!==`candidate`||Ug(e,t,o,i,t=>({peerId:Pm,offerId:s.offerId,candidate:t,...e.isPassive?{passive:!0}:{}}),()=>!a.connectedPeer&&a.offerPeer===s.peer&&a.offerId===s.offerId))},i(o,th({peerId:Pm,offerId:s.offerId,offer:s.offer,...e.isPassive?{passive:!0}:{}})),c=!0,a.offerSignalBacklog.forEach(e=>a.offerSignalRelays[t]?.(e))},s_=async(e,t,n,r,i,a,o)=>{let s=Jg(e.peerStates,n);if(s.answeringPeer||s.offerAnswered)return;let c=!!(s.offerPeer||s.offerRelays.some(Boolean));if((c||a)&&Pm<n)return;c&&t_(s,e.offerPool);let l=e.initPeer(!1,e.config);s.answeringPeer=l,s.answerSent=!1,s.connectionErrorReported=!1,n_(e,s,n,l),Yg(s);let u=()=>{s.answeringPeer===l&&!s.connectedPeer&&s.answerSent&&qg(e,s,n),Xg(s,l),e.disconnectPeer(l,n),e.checkDeactivate()};l.setHandlers({connect:()=>e.connectPeer(l,n,t),close:u,error:u});let d;try{d=await e.toPlain({type:`offer`,sdp:r})}catch{Xg(s,l),e.onJoinError?.({error:`incorrect room password when decrypting offer`,appId:e.appId,peerId:n,roomId:e.roomId});return}if(l.isDead){Xg(s,l);return}let f=await yh(Qm(e.rootTopicPlaintext,n));e.isLeaving()||(l.setHandlers({signal:t=>{e.isLeaving()||s.answeringPeer!==l||l.isDead||(t.type===`answer`||t.type===`candidate`)&&Ug(e,t,f,o,n=>{let r={peerId:Pm};return t.type===`answer`?(s.answerSent=!0,r.answer=n):r.candidate=n,i&&(r.offerId=i),e.isPassive&&(r.passive=!0),r},()=>s.answeringPeer===l&&!l.isDead)}}),await l.signal(d),await r_(s,l,i))},c_=async(e,t,n,r,i)=>{let a;try{a=await e.toPlain({type:Hm,sdp:n})}catch{return}let o=Jg(e.peerStates,t),s=r&&o?.offerPeer&&o.offerId===r?o.offerPeer:null,c=o?.answeringPeer??null,l=!r&&o?.offerPeer?o.offerPeer:null,u=i&&!i.isDead?i:s??c??l;if(!u||u.isDead){let e=r??Lg;(o.pendingCandidates[e]??=[]).push(a);return}u.signal(a)},l_=async(e,t,n,r,i,a)=>{let o;try{o=await e.toPlain({type:`answer`,sdp:r})}catch{e.onJoinError?.({error:`incorrect room password when decrypting answer`,appId:e.appId,peerId:n,roomId:e.roomId});return}if(a)e.offerPool.claimLeased(a),a.setHandlers({connect:()=>e.connectPeer(a,n,t),close:()=>e.disconnectPeer(a,n)}),a.signal(o);else{let t=e.peerStates[n];if(!t||!t.offerPeer||t.offerAnswered||i&&t.offerId&&i!==t.offerId||t.offerPeer.isDead)return;t.offerAnswered=!0,i_(e,t,n,Ng),t.offerPeer.signal(o)}},u_=(e,t,n)=>{let r=e.peerStates[t];r&&!r.connectedPeer&&r.offerRelays[n]&&(Qg(r,n),e.checkDeactivate())},d_=e=>t=>async(n,r,i)=>{if(e.isLeaving())return;let a=Bg(r);if(!a||Hg(a))return;let o=Vg(a,`peerId`)??``,s=Vg(a,`offer`),c=Vg(a,`answer`),l=Vg(a,`candidate`),u=Vg(a,`offerId`),d=a.peer,f=a.hasOutgoingOffer===!0,p=a.passive===!0;if(!o||o===Pm)return;let[m,h]=await Fm([e.rootTopicP,e.selfTopicP]);if(e.isLeaving()||n!==m&&n!==h||e.isPassive&&p||(e.isPassive&&!e.isActive&&!c&&!l&&(e.isActive=!0,e.requeueAnnounce?.()),e.isPassive&&!e.isActive))return;let g=e.peerStates[o],_=g?.connectedPeer;if(_&&g){let e=jg(_);if(e===`live`){g.connectedPeerUnhealthySinceMs=null;return}if(e===`stale`)Zg(g,o,`message-from-stale-peer`);else{let e=Date.now(),t=g.connectedPeerUnhealthySinceMs??e;if(g.connectedPeerUnhealthySinceMs=t,e-t<Fg)return;Zg(g,o,`message-from-prolonged-disconnect`)}}let v=e.sharedPeers.get(e.appId,o);v&&e.sharedPeers.getHealth(v.peer)===`stale`&&(e.sharedPeers.clear(e.appId,o,{destroyPeer:!0}),v=void 0);let y=!(!o||s||c||l);if(y&&!v){let n=Jg(e.peerStates,o),r=Pm<o;if(n.answeringPeer||n.connectedPeer||n.offerAnswered)return;if(!r&&!n.offerPeer){let t=await yh(Qm(e.rootTopicPlaintext,o));!e.isLeaving()&&!n.connectedPeer&&i(t,th({peerId:Pm}));return}if(n.offerRelays[t])return;n.offerRelays[t]=Rg,Yg(n)}if(v&&(s||c||l)){if(v.bindings[e.roomId])return;e.attachSharedPeerToRoom(o,v);return}if(y)return o_(e,t,o,v,i);if(s)return s_(e,t,o,s,u,f,i);if(l)return c_(e,o,l,u,d);if(c)return l_(e,t,o,c,u,d)},f_=5333,p_=[233,533,1333],m_=7533,h_=123333,g_=({init:e,subscribe:t,announce:n,deactivate:r})=>{let i={},a={},o={},s={},c=new Mg,l=()=>Bm(i).some(e=>zm(e).length>0),u=e=>a[e]??={},d=e=>o[e]??={},f=(e,t,n)=>{c.getHealth(e.peer)===`live`&&c.sendRoomPresence(e,t,n)},p=(e,t)=>{Lm(a[e]??{}).forEach(([n,r])=>{if(!r.shouldAdvertise())return;let{roomToken:i,roomTokenPromise:o}=r;if(i){f(t,i,!0);return}o.then(i=>{a[e]?.[n]===r&&r.roomToken===i&&(c.get(e,t.peerId)!==t||t.isClosing||r.shouldAdvertise()&&f(t,i,!0))})})},m=(e,t,n)=>Bm(c.getMap(e)).forEach(e=>f(e,t,n)),h=e=>{s[e]||(s[e]=c.setRoomPresenceHandler(e,(t,n,r)=>{if(!r)return;let i=c.get(e,t),s=o[e]?.[n];i&&s&&a[e]?.[s]?.attachSharedPeerToRoom(t,i)}))},g=e=>{i[e]&&zm(i[e]).length>0||(s[e]?.(),delete s[e],delete a[e],delete o[e])},_=!1,v=[],y=null,b=Vm;return(s,f,x)=>{if(!s)throw Wm(`requires a config map as the first argument`);if(x&&typeof x!=`object`)throw Wm(`third argument must be a callbacks object`);let{appId:S}=s,C=x?.onJoinError,w=x?.onPeerHandshake,T=x?.handshakeTimeoutMs;if(!S)throw Wm(`config map is missing appId field`);if(!f)throw Wm(`roomId argument required`);if(T!==void 0&&(!Number.isFinite(T)||T<=0))throw Wm(`handshakeTimeoutMs must be a positive number`);if(i[S]?.[f])return i[S][f];h(S);let E=Qm(Am,S,f),D=yh(E),O=yh(Qm(E,Pm)),ee=bh(s.password??``,S,f),k=xh(S,f),te=s._test_only_sharedPeerIdleMs??h_,A=!1,ne=e=>async t=>({type:t.type,sdp:await e(ee,t.sdp)}),j=ne(Th),M=ne(wh),N=c.getMap(S),re=()=>Hh(!0,s),ie=!1;y||=new kh(re);let ae=y,oe=async e=>{let t=await e.getOffer(Date.now()-e.created>Eh);if(!t||t.type!==`offer`)throw Wm(`failed to get offer for peer`);return(await M(t)).sdp},se=(e,t)=>{let n=Jg(me.peerStates,e);n.answeringExpiryTimer=Um(n.answeringExpiryTimer),n.answeringPeer=null;let{proxy:r,isNew:i}=c.bind(f,k,t,{onDetach:()=>{let n=me.peerStates[e];n?.connectedPeer===t.peer&&(n.connectedPeer=null,n.connectedPeerUnhealthySinceMs=null,Yg(n))}});n.connectedPeer=t.peer,n.connectedPeerUnhealthySinceMs=null,Yg(n),i&&Se(r,e),t_(n,ae)},ce=(e,t,n)=>{if(A){e.destroy();return}let r=Jg(me.peerStates,t);if(r.connectedPeer){let n=N[t];if(n&&r.connectedPeer===n.peer&&n.bindings[f])return;r.connectedPeer!==e&&!e.isDead&&e.destroy();return}let i=N[t];if(i&&c.getHealth(i.peer)===`stale`&&(c.clear(S,t,{destroyPeer:!0}),i=void 0),i&&i.peer!==e){e.isDead||e.destroy(),se(t,i);return}let a=!i;i||=c.register(S,t,e,te),se(t,i),a&&p(S,i)},le=(e,t)=>{if(A)return;let n=me.peerStates[t];n?.connectedPeer===e&&(Zg(n,t,`close-event`),pe(),!P&&ie&&me.requeueAnnounce?.())},P=!!s.passive,ue=null,de,fe=Vm,pe=()=>{if(!P||!me.isActive)return;let e=!1;Lm(me.peerStates).forEach(([t,n])=>{n.connectedPeer||n.answeringPeer||n.offerInitPromise||n.offerPeer||n.offerRelays.some(Boolean)?e=!0:n.status===`idle`&&delete me.peerStates[t]}),e||(me.isActive=!1,de=Um(de),be.forEach(Um),be.length=0,fe(),ue?.roomToken&&m(S,ue.roomToken,!1))},me={appId:S,roomId:f,config:s,peerStates:{},rootTopicPlaintext:E,rootTopicP:D,selfTopicP:O,toPlain:j,toCipher:M,isLeaving:()=>A,isPassive:P,isActive:!P,onJoinError:C,sharedPeers:c,offerPool:ae,encryptOffer:oe,initPeer:Hh,connectPeer:ce,disconnectPeer:le,attachSharedPeerToRoom:se,checkDeactivate:pe,announceIntervals:[],announceIntervalMs:f_},he={config:s,appId:S,roomId:f,isPassive:P},ge=d_(me);if(!_){let t=e(s);v=(Array.isArray(t)?t:[t]).map(e=>Promise.resolve(e)),_=!0,b=s.relayConfig?.manualReconnection?Vm:ph()}!P&&!ae.isActive&&ae.warmup(),me.announceIntervals=v.map(()=>f_);let _e=v.map(()=>f_),ve=v.map(()=>0),ye=v.map(()=>0),be=[],xe=v.map(async(e,n)=>t(await e,await D,await O,ge(n),e=>ae.getOffers(e,oe),he));Fm([D,O]).then(([e,t])=>{if(A)return;let i=async(r,a)=>{if(A||P&&!me.isActive)return;let o=P?{passive:!0}:void 0,c;try{c=await n(r,e,t,o,he),ye[a]=0}catch(e){let t=ye[a]??0;t===0&&s.relayConfig?.warnOnRelayFailure!==!1&&console.warn(`${Am}: announce failed - ${Gm(e,``)}`),ye[a]=t+1}if(A||P&&!me.isActive||c&&typeof c!=`number`&&`stopAnnouncing`in c)return;typeof c==`number`?(me.announceIntervals[a]=c,_e[a]=c):c&&(_e[a]=c.nextAnnounceMs,ie||=c.reannounceOnDisconnect===!0);let l=ve[a]??0;ve[a]=l+1;let u=_e[a]??f_,d=p_[l];be[a]=setTimeout(()=>{i(r,a)},typeof d==`number`?Math.min(u,d):u)};fe=()=>{r&&v.forEach(async n=>{let i=await n;A||r(i,e,t,he)})},me.requeueAnnounce=()=>{be.forEach(Um),be.length=0,de=Um(de),ae.isActive||ae.warmup(),ue?.roomToken&&m(S,ue.roomToken,!0),de=setTimeout(pe,m_),v.forEach(async(e,t)=>{let n=await e;n&&!A&&(ve[t]=0,i(n,t))})},xe.forEach(async(e,t)=>{if(await e,A)return;let n=await v[t];n&&!A&&(!P||me.isActive)&&i(n,t)})});let Se=Vm,{compose:Ce}=jh(s.password??``,S,f),we=Ce(w),Te={...we?{onPeerHandshake:we}:{},...T===void 0?{}:{handshakeTimeoutMs:T},isPassive:P,onHandshakeError:(e,t)=>C?.({error:t.replace(/^handshake failed: /,``),appId:S,peerId:e,roomId:f})};i[S]??={};let Ee=u(S),De=wg(e=>Se=e,e=>{if(A)return;let t=me.peerStates[e];t?.connectedPeer&&(t.connectedPeer=null,Yg(t),pe())},()=>{A=!0,Se=Vm;let e=a[S]?.[f];e?.roomToken&&(m(S,e.roomToken,!1),delete o[S]?.[e.roomToken],o[S]&&!zm(o[S]).length&&delete o[S]),a[S]&&(delete a[S][f],zm(a[S]).length||delete a[S]),Lm(me.peerStates).forEach(([e,t])=>{if(t.answeringExpiryTimer=Um(t.answeringExpiryTimer),t.connectedPeer&&!t.connectedPeer.isDead){let n=N[e];(!n||n.peer!==t.connectedPeer)&&t.connectedPeer.destroy()}t.answeringPeer&&!t.answeringPeer.isDead&&t.answeringPeer.destroy(),t_(t,ae),t.connectedPeer=null,t.answeringPeer=null,Yg(t)}),i[S]&&(delete i[S][f],zm(i[S]).length===0&&delete i[S]),be.forEach(Um),de=Um(de),xe.forEach(async e=>{(await e)()}),!l()&&(_=!1,ae.destroy(),y=null,b(),g(S))},Te);return ue={roomToken:null,roomTokenPromise:k,attachSharedPeerToRoom:se,shouldAdvertise:()=>!P||me.isActive},Ee[f]=ue,k.then(e=>{let t=ue;t&&!A&&a[S]?.[f]===t&&(t.roomToken=e,d(S)[e]=f,Bm(N).forEach(t=>{t.remoteRoomTokens.has(e)&&se(t.peerId,t)}),(!P||me.isActive)&&m(S,e,!0))}),i[S][f]=De}},__=[`offer`,`answer`,`candidate`],v_=6e4,y_=e=>{if(typeof e==`string`)try{let t=nh(e);return t&&typeof t==`object`?t:null}catch{return null}return e},b_=(e,t)=>typeof e[t]==`string`&&e[t]?e[t]:void 0,x_=e=>__.some(t=>t in e&&(typeof e[t]!=`string`||e[t]===``)),S_=e=>{let t=y_(e);if(!t||x_(t))return!1;let n=b_(t,`peerId`);return!(!n||n===Pm||t.passive===!0||b_(t,`answer`)||b_(t,`candidate`))},C_=e=>{if(!e)throw Wm(`topic strategy missing room context`);return e},w_=(e,t,n,r)=>({kind:t,appId:e.appId,roomId:e.roomId,rootTopic:n,selfTopic:r}),T_=(e,t,n,r)=>({kind:t,appId:e.appId,roomId:e.roomId,rootTopic:n,selfTopic:r}),E_=({steadyAnnounceIntervalMs:e=v_,reannounceOnDisconnect:t=!0,init:n,subscribeTopic:r,publishTopic:i,unpublishTopic:a})=>g_({init:n,subscribe:async(e,t,n,a,o,s)=>{let c=C_(s),l=(r,a)=>void i(e,r,a,T_(c,`signal`,t,n)),u=null,d=!1,f=null,p=!1,m=e=>{d||(d=!0,e())},h=()=>(f||=Promise.resolve(r(e,n,(e,t)=>{p||a(e,t,l)},w_(c,`self`,t,n))).then(e=>{u=e,p&&m(e)}),f);c.isPassive||await h();let g=await r(e,t,async(e,t)=>{p||(c.isPassive&&S_(t)&&await h(),p||await a(e,t,l))},w_(c,`root`,t,n));return()=>{p=!0,u&&m(u),g()}},announce:async(n,r,a,o,s)=>{let c=C_(s),l=await i(n,r,th({peerId:Pm,...o}),T_(c,`announce`,r,a));return typeof l==`number`||l!==void 0&&`stopAnnouncing`in l?l:{nextAnnounceMs:l?.nextAnnounceMs??e,reannounceOnDisconnect:l?.reannounceOnDisconnect??t}},...a?{deactivate:(e,t,n,r)=>a(e,t,T_(C_(r),`announce`,t,n))}:{}}),D_=fh(e=>e.socket),O_=5,k_=`x`,A_=`EVENT`,{secretKey:j_,publicKey:M_}=Sm.keygen(),N_=Zm(M_),P_={},F_={},I_={},L_=250,R_=6e4,z_=9e5,B_=5333,V_=new WeakMap,H_=new WeakSet,U_=new WeakMap,W_=e=>{let t=V_.get(e),n=Math.min(t?.delayMs?Math.max(R_,t.delayMs*2):R_,z_);return V_.set(e,{delayMs:n,untilMs:Date.now()+n}),n},G_=e=>{let t=V_.get(e);if(!t)return 0;let n=t.untilMs-Date.now();return n>0?n:0},K_=e=>({nextAnnounceMs:e}),q_={stopAnnouncing:!0},J_=e=>{if(H_.has(e))return!1;let t=U_.get(e);return t&&(clearTimeout(t.timer),U_.delete(e)),H_.add(e),V_.delete(e),e.close?.(),!0},Y_=(e,t)=>{let n=U_.get(e);n&&(clearTimeout(n.timer),n.eventIds.add(t));let r=n?.eventIds??new Set([t]),i=setTimeout(()=>{U_.delete(e)},B_);U_.set(e,{eventIds:r,timer:i})},X_=(e,t)=>{let n=U_.get(e);return n?.eventIds.has(t)?(clearTimeout(n.timer),U_.delete(e),!0):!1},Z_=()=>Math.floor(Date.now()/1e3),Q_=e=>I_[e]??=rh(e,1e4)+2e4,$_=async(e,t)=>{let n={kind:Q_(e),tags:[[k_,e]],created_at:Z_(),content:t,pubkey:N_},r=await vh(`SHA-256`,th([0,n.pubkey,n.created_at,n.kind,n.tags,n.content]));return th([A_,{...n,id:Zm(r),sig:Zm(await Sm.signAsync(r,j_))}])},ev={},tv=e=>{e.flushWaiters.forEach(e=>e()),e.flushWaiters.clear()},nv=(e,t,n)=>{let r=ev[e.url]??={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set};r.topics.set(t,n),iv(e,r)},rv=(e,t)=>{let n=ev[e.url];n&&(n.topics.delete(t),n.topics.size===0?(n.updateTimer!==null&&(clearTimeout(n.updateTimer),n.updateTimer=null),tv(n),n.subIds.forEach(t=>e.send(th([`CLOSE`,t]))),delete ev[e.url]):iv(e,n))},iv=(e,t)=>{t.updateTimer===null&&(t.updateTimer=setTimeout(()=>{t.updateTimer=null;try{ov(e)}finally{tv(t)}},0))},av=e=>{let t=ev[e.url];return!t||t.updateTimer===null?Promise.resolve():new Promise(e=>t.flushWaiters.add(e))},ov=e=>{let t=ev[e.url];if(!t||t.topics.size===0)return;let n=[...t.topics.keys()],r=[],i=Z_();for(let e=0;e<n.length;e+=L_)r.push(n.slice(e,e+L_));for(;t.subIds.length>r.length;){let n=t.subIds.pop();n&&e.send(th([`CLOSE`,n]))}r.forEach((n,r)=>{let a=t.subIds[r]??=Nm(64);e.send(th([`REQ`,a,{kinds:[...new Set(n.map(Q_))],since:i,"#x":n}]))})},sv=e=>{let t=ev[e.url];t&&t.topics.size>0&&ov(e)},cv=E_({init:e=>eh(e,lv,O_,!0).map(t=>{let n=D_.register(t,()=>dh(t,t=>{let[r,i,a,o]=nh(t);if(r!==A_){let t=`${Am}: relay failure from ${n.url} - `,s=r===`CLOSED`&&typeof a==`string`?a:o,c=r===`OK`&&a===!1,l=c&&s?.startsWith(`rate-limited:`),u=c&&s?.startsWith(`duplicate:`),d=r===`CLOSED`||c&&!l&&!u,f=r===`OK`&&X_(n,i);if(d&&!J_(n))return;l?W_(n):f&&V_.delete(n),!u&&e.relayConfig?.warnOnRelayFailure!==!1&&(r===`NOTICE`?console.warn(t+i):(c||r===`CLOSED`)&&console.warn(t+s));return}if(a&&typeof a==`object`&&`content`in a){let{content:e}=a,t=F_[i];if(t){t(P_[i]??``,e);return}let r=ev[n.url];if(r?.subIds.includes(i)&&a.tags){let t=a.tags.find(e=>e[0]===k_);t?.[1]&&r.topics.get(t[1])?.(t[1],e)}}},()=>sv(n)));return n.ready}),subscribeTopic:(e,t,n,r)=>{nv(e,t,(e,t)=>void n(e,t));let i=()=>{rv(e,t)};return r.kind===`root`?av(e).then(()=>i):i},publishTopic:async(e,t,n,r)=>{if(H_.has(e)||e.isClosed)return r.kind===`announce`?q_:void 0;if(r.kind===`announce`){let t=G_(e);if(t>0)return K_(Math.max(R_,t))}let i=await $_(t,typeof n==`string`?n:th(n)),a=e.socket.readyState===1;if(e.send(i),r.kind!==`announce`)return;if(!a)return K_(W_(e));let o=nh(i)[1].id;return Y_(e,o),K_(R_)}});D_.getSockets;var lv=`basspistol.org,bucket.coracle.social,chorus.pjv.me,koru.bitcointxoko.org,nos.lol,nostr-01.uid.ovh,nostr-01.yakihonne.com,nostr-relay.corb.net,nostr.data.haus,nostr.islandarea.net,nostr.sathoarder.com,nostr.tegila.com.br,nostr.vulpem.com,purplerelay.com,relay-can.zombi.cloudrodion.com,relay-rpi.edufeed.org,relay.agorist.space,relay.artio.inf.unibe.ch,relay.mostr.pub,relay.mostro.network,relay.sigit.io,relay02.lnfi.network,schnorr.me,social.amanah.eblessing.co,staging.yabu.me,strfry.shock.network,top.testrelay.top,yabu.me/v2`.split(`,`).map(e=>`wss://`+e),uv=6,dv=new TextEncoder,fv=e=>Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``),pv=e=>new Uint8Array((e.match(/../g)??[]).map(e=>parseInt(e,16))),mv=async e=>new Uint8Array(await crypto.subtle.digest(`SHA-256`,dv.encode(e))),hv=(e,t)=>typeof e==`string`&&e.length===t&&/^[0-9a-f]+$/.test(e);function gv(){try{let e=localStorage.getItem(`ob.nkey`);if(e&&hv(e,64))return pv(e)}catch{}let e=Sm.keygen().secretKey;try{localStorage.setItem(`ob.nkey`,fv(e))}catch{}return e}async function _v(e){return fv(await mv(JSON.stringify([0,e.pubkey,e.created_at,e.kind,e.tags,e.content])))}async function vv(e){try{return!e||!hv(e.id,64)||!hv(e.pubkey,64)||!hv(e.sig,128)||typeof e.content!=`string`||!Array.isArray(e.tags)||!Number.isFinite(e.created_at)||await _v(e)!==e.id?!1:await Sm.verifyAsync(pv(e.sig),pv(e.id),pv(e.pubkey))}catch{return!1}}var yv=new class{socks=[];subs=new Map;sk=gv();pubkey=fv(Sm.getPublicKey(this.sk));started=!1;start(){if(this.started)return;this.started=!0;let e=[...lv].sort(()=>Math.random()-.5).slice(0,uv);for(let t of e)this.connect(t.startsWith(`wss://`)?t:`wss://${t}`)}connect(e,t=0){setTimeout(()=>{let n;try{n=new WebSocket(e)}catch{return}n.onopen=()=>{for(let[e,t]of this.subs)n.send(JSON.stringify([`REQ`,e,t.filter]))},n.onmessage=e=>void this.onMessage(e.data),n.onclose=()=>{this.socks=this.socks.filter(e=>e!==n),t<6e4&&this.connect(e,Math.max(2e3,t*2))},n.onerror=()=>n.close(),this.socks.push(n)},t)}async onMessage(e){if(typeof e!=`string`||e.length>2e4)return;let t;try{t=JSON.parse(e)}catch{return}if(!Array.isArray(t)||t[0]!==`EVENT`)return;let n=this.subs.get(String(t[1])),r=t[2];n&&r&&!n.seen.has(r.id)&&(n.seen.add(r.id),n.seen.size>5e3&&n.seen.clear(),await vv(r)&&n.on(r))}subscribe(e,t){this.start();let n=`ob`+Math.random().toString(36).slice(2,10);this.subs.set(n,{filter:e,on:t,seen:new Set});for(let t of this.socks)t.readyState===1&&t.send(JSON.stringify([`REQ`,n,e]));return()=>{this.subs.delete(n);for(let e of this.socks)e.readyState===1&&e.send(JSON.stringify([`CLOSE`,n]))}}async sign(e){return fv(await Sm.signAsync(await mv(e),this.sk))}async publish(e,t,n){this.start();let r={pubkey:this.pubkey,created_at:Math.floor(Date.now()/1e3),kind:e,tags:n,content:t},i=await _v(r),a=fv(await Sm.signAsync(pv(i),this.sk)),o={...r,id:i,sig:a},s=()=>{for(let e of this.socks)e.readyState===1&&e.send(JSON.stringify([`EVENT`,o]))};return this.socks.some(e=>e.readyState===1)?s():setTimeout(s,2500),o}};async function bv(e){return yv.sign(e)}async function xv(e,t,n){try{return!hv(t,128)||!hv(n,64)?!1:await Sm.verifyAsync(pv(t),await mv(e),pv(n))}catch{return!1}}var Sv=`fuck.shit.bitch.cunt.dick.cock.pussy.asshole.bastard.slut.whore.fag.faggot.nigger.nigga.retard.twat.wank.wanker.bollocks.prick.motherfucker.dildo.porn.rape.nazi.kys.spic.chink.kike.tranny.cum.jizz.boob.tits.penis.vagina.hitler`.split(`.`),Cv={0:`o`,1:`i`,3:`e`,4:`a`,5:`s`,7:`t`,"@":`a`,$:`s`,"!":`i`,"|":`i`,"+":`t`};function wv(e){return e.toLowerCase().split(``).map(e=>Cv[e]??e).join(``).replace(/(.)\1{2,}/g,`$1$1`)}var Tv=RegExp(`(${Sv.map(e=>e.split(``).join(`[^a-z]*`)).join(`|`)})`,`gi`);function Ev(e){return Tv.lastIndex=0,Tv.test(wv(e))}function Dv(e){let t=wv(e),n=e.split(``);Tv.lastIndex=0;let r;for(;r=Tv.exec(t);)for(let e=r.index;e<r.index+r[0].length&&e<n.length;e++)/\S/.test(n[e])&&(n[e]=`*`);return n.join(``)}function Ov(e,t=160){return e.replace(/[\u0000-\u001f<>]/g,``).slice(0,t).trim()}var kv=30078,Av=`open-backrooms-board-v1`,jv=2592e6,Mv=Date.UTC(2026,0,1),Nv=3,Pv=[{id:`month`,name:`Until the next reset`,cycles:1,price:20},{id:`quarter`,name:`Survives 2 resets (~90 days)`,cycles:3,price:150},{id:`year`,name:`Survives 11 resets (~1 year)`,cycles:12,price:1500},{id:`forever`,name:`Permanent`,cycles:1/0,price:1e6}],Fv=e=>Math.floor((e-Mv)/jv),Iv=(e=Date.now())=>Mv+(Fv(e)+1)*jv;function Lv(e,t){return t.cycles===1/0?1/0:Mv+(Fv(e)+t.cycles)*jv}function Rv(e){let t;try{t=JSON.parse(e.content)}catch{return null}let n=e.created_at*1e3;if(n>Date.now()+6e5)return null;let r=Pv.find(e=>e.id===t.tier)??Pv[0],i=Dv(Ov(String(t.text??``),160));return i.length<3?null:{id:e.id,author:e.pubkey,name:Dv(Ov(String(t.name??`Wanderer`),24))||`Wanderer`,text:i,t:n,tier:r.id,expires:Lv(n,r),mine:e.pubkey===yv.pubkey}}var zv=new class{notes=new Map;onNew;onChange;listeners=new Set;since=Date.now();unsub=null;connect(){this.unsub||=(this.load(),yv.subscribe({kinds:[kv],"#t":[Av],limit:500},e=>{let t=Rv(e);t&&!this.notes.has(t.id)&&(this.notes.set(t.id,t),t.t>this.since&&!t.mine&&this.onNew?.(t),this.save(),this.changed())}))}list(){let e=Date.now(),t=new Map;return[...this.notes.values()].filter(t=>t.expires>e).sort((e,t)=>+(t.expires===1/0)-(e.expires===1/0)||t.t-e.t).filter(e=>{let n=(t.get(e.author)??0)+1;return t.set(e.author,n),n<=Nv||e.expires===1/0})}async post(e,t,n){let r=Date.now(),i=Lv(r,n),a=[[`d`,`n`+r.toString(36)],[`t`,Av]];i!==1/0&&a.push([`expiration`,String(Math.floor(i/1e3))]);let o=Rv(await yv.publish(kv,JSON.stringify({name:e,text:t,tier:n.id,v:1}),a));o&&(this.notes.set(o.id,o),this.save(),this.changed())}split(){let e=this.list().sort((e,t)=>+(t.expires===1/0)-(e.expires===1/0)||e.t-t.t);return{pinned:e.slice(0,12),overflow:e.slice(12).reverse()}}get full(){return this.list().length>=12}changed(){this.onChange?.();for(let e of this.listeners)e()}load(){queueMicrotask(()=>this.changed());try{let e=JSON.parse(localStorage.getItem(`ob.board2`)||`[]`);for(let t of e)t&&typeof t.id==`string`&&this.notes.set(t.id,{...t,expires:t.expires??1/0,mine:t.author===yv.pubkey})}catch{}}save(){try{let e=this.list().slice(0,300).map(e=>({...e,expires:e.expires===1/0?null:e.expires}));localStorage.setItem(`ob.board2`,JSON.stringify(e))}catch{}}},Bv=2048,Vv=Math.round(Bv*.9/1.5),Hv=4,Uv=Math.ceil(12/Hv),Wv=[`#eee6cf`,`#e9dfb8`,`#f1ecd9`,`#e2e8cf`,`#ead7c4`,`#dfe3e8`],Gv=[`#b23b2c`,`#2f5fa8`,`#3b8a4a`,`#c9a227`,`#7d3fa1`],Kv=`"Caveat", "Segoe Print", "Bradley Hand", cursive`;function qv(e,t){let n=2166136261^t;for(let t=0;t<e.length;t++)n=Math.imul(n^e.charCodeAt(t),16777619);return(n>>>0)%1e4/1e4}function Jv(e,t,n){let r=[],i=``;for(let a of t.split(/\s+/)){let t=i?i+` `+a:a;if(e.measureText(t).width<=n||!i){if(e.measureText(t).width>n&&!i){let t=``;for(let i of a)e.measureText(t+i).width>n&&(r.push(t),t=``),t+=i;i=t}else i=t}else r.push(i),i=a}return i&&r.push(i),r}var Yv=class{mesh;canvas=document.createElement(`canvas`);ctx;tex;listener=()=>this.draw();fontReady=!1;constructor(e=8){this.canvas.width=Bv,this.canvas.height=Vv,this.ctx=this.canvas.getContext(`2d`),this.tex=new xa(this.canvas),this.tex.colorSpace=Ue,this.tex.anisotropy=e;let t=bd(new La({map:this.tex,transparent:!0,alphaTest:.02,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2}));this.mesh=new Si(new Ea(1.5,.9),t),this.mesh.position.z=.024,this.mesh.receiveShadow=!0,this.mesh.name=`BoardNotes`,zv.listeners.add(this.listener),this.draw(),document.fonts?.load(`600 40px ${Kv}`).then(()=>{this.fontReady=!0,this.draw()})}draw(){this.ctx.clearRect(0,0,Bv,Vv);let{pinned:e,overflow:t}=zv.split(),n=Bv/Hv,r=Vv/Uv;e.forEach((e,t)=>this.note(e,t%Hv*n,Math.floor(t/Hv)*r,n,r)),e.length||this.card(`Notices`,`Nothing pinned yet. Leave a warning for whoever comes next.`,Bv/2,Vv/2),t.length&&this.tag(`+${t.length} more in the pile`,1818,1195),this.tex.needsUpdate=!0}note(e,t,n,r,i){let a=this.ctx,o=r*(.8+qv(e.id,1)*.08),s=i*(.78+qv(e.id,2)*.1),c=t+r/2+(qv(e.id,3)-.5)*(r-o)*.8,l=n+i/2+(qv(e.id,4)-.5)*(i-s)*.8;a.save(),a.translate(c,l),a.rotate((qv(e.id,5)-.5)*.09),a.shadowColor=`rgba(0,0,0,0.45)`,a.shadowBlur=14,a.shadowOffsetX=4,a.shadowOffsetY=7,a.fillStyle=e.expires===1/0?`#e8d48a`:Wv[Math.floor(qv(e.id,6)*Wv.length)],a.beginPath(),a.moveTo(-o/2,-s/2),a.lineTo(o/2,-s/2),a.lineTo(o/2,s/2-26),a.lineTo(o/2-30,s/2),a.lineTo(-o/2,s/2),a.closePath(),a.fill(),a.shadowColor=`transparent`,a.fillStyle=`rgba(0,0,0,0.12)`,a.beginPath(),a.moveTo(o/2,s/2-26),a.lineTo(o/2-30,s/2),a.lineTo(o/2-26,s/2-22),a.fill(),e.expires===1/0&&(a.strokeStyle=`#a8862a`,a.lineWidth=5,a.strokeRect(-o/2+8,-s/2+8,o-16,s-16));let u=46,d=[];for(;u>=24&&(a.font=`600 ${u}px ${Kv}`,d=Jv(a,e.text,o-52),!(d.length*u*1.02<=s-52-40));u-=2);a.fillStyle=`#26211a`,a.textBaseline=`top`;let f=u*1.02;d.slice(0,Math.floor((s-52-40)/f)).forEach((e,t)=>a.fillText(e,-o/2+26,-s/2+26+10+t*f)),a.font=`500 22px ${this.fontReady?`Inter, `:``}system-ui, sans-serif`,a.fillStyle=`rgba(38,33,26,0.6)`,a.fillText(`— ${e.name}`,-o/2+26,s/2-26-18),this.pin(0,-s/2+16,Gv[Math.floor(qv(e.id,7)*Gv.length)]),a.restore()}card(e,t,n,r,i=-.02){let a=this.ctx;a.save(),a.translate(n,r),a.rotate(i),a.font=`600 52px ${Kv}`;let o=Math.max(a.measureText(e).width,300);a.font=`600 32px ${Kv}`;let s=Jv(a,t,Math.max(o,420)),c=Math.max(o,420)+60,l=100+s.length*36;a.shadowColor=`rgba(0,0,0,0.45)`,a.shadowBlur=14,a.shadowOffsetY=7,a.fillStyle=`#f1ecd9`,a.fillRect(-c/2,-l/2,c,l),a.shadowColor=`transparent`,a.fillStyle=`#26211a`,a.textAlign=`center`,a.textBaseline=`top`,a.font=`600 52px ${Kv}`,a.fillText(e,0,-l/2+22),a.font=`600 32px ${Kv}`,s.forEach((e,t)=>a.fillText(e,0,-l/2+82+t*36)),this.pin(0,-l/2+14,Gv[0]),a.restore()}tag(e,t,n){let r=this.ctx;r.save(),r.translate(t,n),r.rotate(-.03),r.font=`600 34px ${Kv}`;let i=r.measureText(e).width+50;r.shadowColor=`rgba(0,0,0,0.45)`,r.shadowBlur=10,r.shadowOffsetY=5,r.fillStyle=`#f4efe0`,r.fillRect(-i/2,-26,i,52),r.shadowColor=`transparent`,r.fillStyle=`#7a1f16`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(e,0,2),r.restore()}pin(e,t,n){let r=this.ctx;r.shadowColor=`rgba(0,0,0,0.5)`,r.shadowBlur=6,r.shadowOffsetX=3,r.shadowOffsetY=4;let i=r.createRadialGradient(e-4,t-4,1,e,t,13);i.addColorStop(0,`#fff`),i.addColorStop(.25,n),i.addColorStop(1,`#000`),r.fillStyle=i,r.beginPath(),r.arc(e,t,13,0,Math.PI*2),r.fill(),r.shadowColor=`transparent`}dispose(){zv.listeners.delete(this.listener),this.tex.dispose(),this.mesh.material.dispose(),this.mesh.geometry.dispose()}},Xv=new Map;async function Zv(e){let t=Xv.get(e);return t||(t=(await Ff(e)).scene,t.traverse(e=>{let t=e;t.isMesh&&(t.castShadow=!0,t.receiveShadow=!0,t.material=(Array.isArray(t.material)?t.material:[t.material]).map(e=>{let t=e.clone();return t.name.startsWith(`Glow`)&&(t.emissiveIntensity=3),bd(t)}),Array.isArray(t.material)&&t.material.length===1&&(t.material=t.material[0]))}),Xv.set(e,t)),t.clone(!0)}var Qv=new H(1.22,0,1.22),$v=class{world;collider;root=new jn;interactables=[];pickupMeshes=new Map;consumed=new Set;exitObj=null;exitAnim=null;hubBoxes=[];boardDisplay=null;noExit=!1;constructor(e,t){this.world=e,this.collider=t}async buildHub(){if(this.world.level!==0)return;let e=id[0].cell,t=id[0].wallThick/2,n=-2*e+t,r=3*e-t,i=-2*e+t,a=3*e-t,o=async(e,t,n,r,i)=>{let a=await Zv(e);return a.position.set(t,n,r),a.rotation.y=i,this.root.add(a),a};await Promise.all([o(`lockers`,-1.4,0,n,0),o(`kiosk`,r-.36,0,-2.4,-Math.PI/2),o(`bulletin_board`,i,1.45,-2.2,Math.PI/2).then(e=>{this.boardDisplay=new Yv,e.add(this.boardDisplay.mesh)}),o(`couch`,-2.6,0,a-.45,Math.PI),o(`armchair`,1.4,0,a-.5,Math.PI+.25),o(`safe_sign`,r,2.3,1.22,-Math.PI/2),o(`safe_sign`,r+2*t,2.3,1.22,Math.PI/2),o(`safe_sign`,i,2.3,1.22,Math.PI/2),o(`safe_sign`,i-2*t,2.3,1.22,-Math.PI/2),o(`office_chair`,3.2,0,4.2,.6)]),this.hubBoxes=[{x0:-2.4,z0:n,x1:-.45,z1:n+.48},{x0:r-.72,z0:-2.87,x1:r,z1:-1.93},{x0:-3.55,z0:a-.9,x1:-1.65,z1:a},{x0:.95,z0:a-.95,x1:1.85,z1:a}],this.collider.extra.push(...this.hubBoxes),this.interactables.push({id:`shop`,kind:`shop`,pos:new H(r-1.1,1,-2.4),radius:1.6,label:`Supply Kiosk`},{id:`locker`,kind:`locker`,pos:new H(-1.4,1,n+1),radius:1.7,label:`Your Locker`},{id:`board`,kind:`board`,pos:new H(i+.9,1.4,-2.2),radius:1.8,label:`Bulletin Board`},{id:`couch`,kind:`couch`,pos:new H(-2.6,.5,a-1.2),radius:1.4,label:`Couch`,data:{x:-2.6,z:a-.5,sx:-2.6,sz:a-1.35}},{id:`armchair`,kind:`armchair`,pos:new H(1.4,.5,a-1.2),radius:1.2,label:`Armchair`,data:{x:1.4,z:a-.52,sx:1.25,sz:a-1.3}})}async syncChunk(e){for(let t of e.layout.pickups)await this.spawnPickup(t);e.layout.exit&&!this.exitObj&&!this.noExit&&await this.spawnExit(e.layout.exit.x,e.layout.exit.z,e.layout.exit.rot)}unloadChunk(e){for(let t of e.layout.pickups){let e=this.pickupMeshes.get(t.id);e&&(this.root.remove(e),this.pickupMeshes.delete(t.id),this.interactables=this.interactables.filter(e=>e.id!==`p`+t.id))}}async spawnPickup(e){if(this.consumed.has(e.id)||this.pickupMeshes.has(e.id))return;let t=await Zv(`almond_water`);t.position.set(e.x,e.y,e.z),t.rotation.y=e.id%628/100,e.y===0&&e.id%3==0&&(t.rotation.z=Math.PI/2,t.position.y=.033),this.pickupMeshes.set(e.id,t),this.root.add(t),this.interactables.push({id:`p`+e.id,kind:`pickup`,pos:new H(e.x,e.y+.1,e.z),radius:1.3,label:`Almond Water`,data:e.id})}consume(e){this.consumed.add(e);let t=this.pickupMeshes.get(e);t&&this.root.remove(t),this.pickupMeshes.delete(e),this.interactables=this.interactables.filter(t=>t.id!==`p`+e)}async spawnExit(e,t,n){let r=this.world.def,i=await Zv(r.exit===`door`?`exit_door`:r.exit===`hatch`?`hatch`:`elevator`);i.position.set(e,0,t),i.rotation.y=n,this.exitObj=i,this.exitAnim=i.getObjectByName(`Door`)??i.getObjectByName(`Lid`)??null,this.root.add(i);let a=new H(Math.sin(n),0,Math.cos(n)),o=r.exit===`door`?`Door to the parking levels`:r.exit===`hatch`?`Stairwell down`:`Elevator`;this.interactables.push({id:`exit`,kind:`exit`,pos:new H(e,1,t).addScaledVector(a,r.exit===`hatch`?0:.8),radius:1.8,label:o});let s=new zo(r.exit===`elevator`?16765066:16726570,2.5,6,2);s.position.set(e,r.height-.4,t).addScaledVector(a,1),i.add(s),s.position.set(0,r.height-.4,1)}nearest(e){let t=null,n=1/0;for(let r of this.interactables){let i=Math.hypot(r.pos.x-e.x,r.pos.z-e.z);i<r.radius&&i<n&&(n=i,t=r)}return t}update(e){for(let[t,n]of this.pickupMeshes)n.position.y+=Math.sin(e*2+t)*2e-4}dispose(){this.boardDisplay?.dispose(),this.boardDisplay=null,this.root.clear(),this.interactables=[],this.pickupMeshes.clear(),this.exitObj=null,this.collider.extra=this.collider.extra.filter(e=>!this.hubBoxes.includes(e))}},ey=null;function ty(){if(ey)return ey;let e=document.createElement(`canvas`);e.width=e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,4,64,64,62);return n.addColorStop(0,`rgba(0,0,0,0.75)`),n.addColorStop(.5,`rgba(0,0,0,0.35)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),ey=new xa(e),ey}function ny(e,t=e){let n=new Si(new Ea(e*2,t*2),new ui({map:ty(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));return n.rotation.x=-Math.PI/2,n.position.y=.006,n.renderOrder=2,n.name=`blob`,n}function ry(e,t,n,r,i,a,o=2500){if(t===r&&n===i)return[[r,i]];let s=(e,t)=>(e+32768)*65536+(t+32768),c=[],l=new Map,u=new Map,d=(e,t)=>Math.abs(e-r)+Math.abs(t-i),f=s(t,n);c.push({k:f,x:t,z:n,g:0,f:d(t,n)}),u.set(f,0);let p=new Set,m=0,h=[[1,0,0],[-1,0,1],[0,1,2],[0,-1,3]];for(;c.length&&m<o;){let t=0;for(let e=1;e<c.length;e++)c[e].f<c[t].f&&(t=e);let n=c[t];if(c[t]=c[c.length-1],c.pop(),!p.has(n.k)){if(p.add(n.k),m++,n.x===r&&n.z===i){let e=[[n.x,n.z]],t=n.k;for(;l.has(t);)t=l.get(t),e.push([Math.floor(t/65536)-32768,t%65536-32768]);return e.reverse()}for(let[t,r,i]of h){if(!e.open(n.x,n.z,i))continue;let o=n.x+t,f=n.z+r;if(a?.(o,f))continue;let m=s(o,f);if(p.has(m))continue;let h=n.g+1;h<(u.get(m)??1/0)&&(u.set(m,h),l.set(m,n.k),c.push({k:m,x:o,z:f,g:h,f:h+d(o,f)}))}}}return null}var iy={hound:`hound`,howler:`howler`,smiler:`smiler`,skinstealer:`avatar`,faceling:`faceling`},ay={hound:`crawler`,howler:`watcher`,smiler:`smiler`,skinstealer:`mimic`},oy=.5,sy=class{id;kind;obj;mixer=null;actions=new Map;anim=``;pos=new H;yaw=0;state=`wander`;touch=0;stung=!1;moved=0;watched=!1;reveal=0;path=[];pathT=0;goal=null;target=null;timer=0;life=0;seen=0;voice=null;visible=1;stepT=0;twitchT=0;netTarget=new H;mimicName=``;constructor(e,t,n,r){if(this.id=e,this.kind=t,this.obj=n,r.length){this.mixer=new ps(n);for(let e of r)this.actions.set(e.name,this.mixer.clipAction(e))}}play(e,t=.25,n=!1){if(this.anim===e||!this.actions.has(e))return;let r=this.actions.get(e);r.reset(),n&&(r.setLoop(F,1),r.clampWhenFinished=!0),r.play();let i=this.actions.get(this.anim);i&&i.crossFadeTo(r,t,!1),this.anim=e}},cy=class{game;root=new jn;list=[];def=null;authority=!0;rng=new Zu(1);nextId=1;spawnT=60;tension=0;templates=new Map;noiseEvents=[];frustum=new Qi;tmpM=new W;remoteTargets=()=>[];held=null;lastSting={};lastTake={};sting(e,t=1){let n=`sting_`+ay[e],r=this.game.time;if(r-(this.lastSting[e]??-99)<12)return!1;this.lastSting[e]=r;let i=this.game.audio.variants(n).length,a=Math.floor(Math.random()*i);return i>1&&a===this.lastTake[e]&&(a=(a+1)%i),this.lastTake[e]=a,this.game.audio.play(n,{gain:t,bus:`sting`,variant:a}),!0}onChase;constructor(e){this.game=e,e.scene.add(this.root)}async template(e){let t=iy[e],n=this.templates.get(t);if(!n){let r=await Ff(t);r.scene.traverse(t=>{let n=t;if(!n.isMesh)return;n.castShadow=!0,n.frustumCulled=!1;let r=(Array.isArray(n.material)?n.material:[n.material]).map(t=>{let r=t.clone();return n.geometry.getAttribute(`color`)&&(r.vertexColors=!0),e===`howler`&&r.color.setScalar(.22),r.name.startsWith(`Glow`)&&(r.emissiveIntensity=6,r.toneMapped=!1),bd(r)});n.material=r.length===1?r[0]:r}),n={scene:r.scene,clips:r.animations},this.templates.set(t,n)}return n}setLevel(e,t){for(let e of this.list)this.remove(e);this.list=[],this.def=e,this.rng=new Zu(t^24301),this.spawnT=e.id===0?75:35,this.tension=0;for(let t of e.entities)this.template(t)}remove(e){this.root.remove(e.obj),e.voice?.stop(.5),e.mixer?.stopAllAction()}noise(e,t,n,r){this.noiseEvents.push({x:e,z:t,r:n,t:3})}targets(){let e=this.game.player,t=[{id:`me`,x:e.pos.x,z:e.pos.z,alive:e.alive,lit:e.flashlight,fx:-Math.sin(e.yaw),fz:-Math.cos(e.yaw)}];return t.push(...this.remoteTargets()),t.push(...this.game.bots.targets()),t}threat(e){let t=0;for(let n of this.list){if(n.visible<.2)continue;let r=Math.hypot(n.pos.x-e.x,n.pos.z-e.z),i=this.game.collider.los(e.x,e.z,n.pos.x,n.pos.z),a=n.state===`chase`||n.state===`lunge`?1:.55;t=Math.max(t,a*td(1-r/(i?22:10),0,1))}return t}cellOf(e,t){let n=this.def.cell;return[Math.floor(e/n),Math.floor(t/n)]}visibleToCamera(e,t=1.2){let n=this.game.camera;this.tmpM.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.tmpM);let r=new Tr(new H(e.x,t,e.z),.6);return this.frustum.intersectsSphere(r)?this.game.collider.los(n.position.x,n.position.z,e.x,e.z):!1}async spawn(e,t,n){let r=await this.template(e),i=r.clips.length?Sd(r.scene):r.scene.clone(!0),a=new sy(this.nextId++,e,i,r.clips);a.pos.set(t,0,n),i.position.copy(a.pos),e!==`smiler`&&i.add(ny(e===`howler`?.45:.7,e===`howler`?.35:.5)),this.root.add(i),this.list.push(a),a.play(`idle`);let o=e===`hound`?`crawler_rasp`:e===`howler`?`watcher_drone`:e===`smiler`?`smiler_drone`:null;if(o&&(a.voice=this.game.audio.play(o,{loop:!0,pos:a.pos,gain:e===`howler`?.5:.7,refDistance:e===`howler`?3:1.5,maxDistance:40,occlude:!0,reverb:.3})),e===`skinstealer`){let e=this.game.net?.peerNames()??[];a.mimicName=e.length?e[Math.floor(Math.random()*e.length)]:this.game.bots.names()[0]??`Wanderer`}return a}spawnSpot(e=!1){let t=this.def,n=this.game.player.pos,r=this.game.world.cache;for(let i=0;i<40;i++){let i=this.rng.range(0,Math.PI*2),a=this.rng.range(14,30),o=n.x+Math.cos(i)*a,s=n.z+Math.sin(i)*a,[c,l]=this.cellOf(o,s);if(od(t.id,c,l))continue;let u=(c+.5)*t.cell,d=(l+.5)*t.cell;if((!this.game.collider.los(n.x,n.z,u,d)||e)&&!(e&&r.zone(c,l)!==3&&this.game.world.sampleE(u,d)>.08)&&ry(r,c,l,Math.floor(n.x/t.cell),Math.floor(n.z/t.cell),(e,n)=>od(t.id,e,n),900))return{x:u,z:d}}return null}director(e,t){let n=this.def,r=this.game;this.tension=td(this.tension+e*(t?-.05:.004+n.id*.002),0,1),this.spawnT-=e;let i=t?0:1+Math.floor(this.tension*(2+n.id))+Math.max(0,+(this.remoteTargets().length>0));if(this.spawnT<=0&&this.list.length<i){this.spawnT=this.rng.range(25,55)*(1.2-this.tension*.6)*(this.def.id===0?2.2:1);let e=r.player.pos,[t,i]=this.cellOf(e.x,e.z),a=r.world.cache.zone(t,i)===3||r.world.sampleE(e.x,e.z)<.08,o=n.entities.filter(e=>e!==`smiler`||a);a||(o=o.filter(e=>e!==`smiler`));let s=this.rng.pick(o),c=this.spawnSpot(s===`smiler`);c&&this.spawn(s,c.x,c.z)}for(let e of[...this.list]){let n=Math.hypot(e.pos.x-r.player.pos.x,e.pos.z-r.player.pos.z);(n>60||e.life>150&&e.state!==`chase`||t&&e.life>20&&n>12)&&(this.remove(e),this.list.splice(this.list.indexOf(e),1))}}update(e,t){if(!this.def||!this.game.world)return;for(let t of this.noiseEvents)t.t-=e;this.noiseEvents=this.noiseEvents.filter(e=>e.t>0),this.authority&&this.director(e,t);let n=this.targets();for(let t of this.list){if(t.life+=e,t===this.held){t.mixer?.update(e);continue}this.authority?this.think(t,e,n):t.pos.lerp(t.netTarget,rd(8,e)),t.obj.position.copy(t.pos);let r=(t.yaw-t.obj.rotation.y+Math.PI*3)%(Math.PI*2)-Math.PI;if(t.obj.rotation.y+=r*Math.min(1,e*(t.state===`chase`?12:5)),t.obj.visible=t.visible>.05,t.mixer&&(t.twitchT-=e,t.kind===`hound`&&t.anim===`idle`&&t.twitchT>0||t.mixer.update(e),t.twitchT<-.3&&Math.random()<e*.8&&(t.twitchT=.08+Math.random()*.25)),t.reveal>0){t.reveal=Math.min(1,t.reveal+e*1.6);let n=t.reveal*t.reveal*(3-2*t.reveal);t.obj.scale.set(1-.18*n,1+.32*n,1-.18*n)}t.kind===`smiler`&&(t.obj.position.y=1.4+Math.sin(t.life*1.3)*.05,t.obj.lookAt(this.game.camera.position.x,t.obj.position.y,this.game.camera.position.z),t.obj.scale.setScalar(.9+t.visible*.1),t.obj.traverse(e=>{let n=e;n.isMesh&&(n.material.opacity=t.visible)})),t.voice?.setPos(t.pos.x,1.2,t.pos.z);let i=this.game.player;if(i.alive&&t.visible>.5){let n=Math.hypot(t.pos.x-i.pos.x,t.pos.z-i.pos.z),r=t.kind===`howler`?1.1:t.kind===`smiler`?.9:.85,[a,o]=this.cellOf(i.pos.x,i.pos.z),s=t.kind===`howler`&&this.visibleToCamera(t.pos,1.6);t.touch=n<r&&!s&&(t.state===`chase`||t.state===`lunge`||t.kind===`howler`)&&!od(this.def.id,a,o)?t.touch+e:0,t.touch>.25&&this.game.die(t.kind,t)}}}moveAlong(e,t,n){let r=this.def,i=this.game.world.cache;if(e.pathT-=n,e.goal&&(e.pathT<=0||!e.path.length)){e.pathT=.6;let[t,n]=this.cellOf(e.pos.x,e.pos.z),[a,o]=this.cellOf(e.goal.x,e.goal.z);e.path=ry(i,t,n,a,o,(e,t)=>od(r.id,e,t),1500)??[],e.path.length>1&&e.path.shift()}let a,o;if(e.path.length>0){let[t,n]=e.path[0];a=(t+.5)*r.cell,o=(n+.5)*r.cell;let[i,s]=this.cellOf(e.pos.x,e.pos.z);i===t&&s===n&&Math.hypot(a-e.pos.x,o-e.pos.z)<r.cell*.45&&e.path.shift(),e.path.length===0&&e.goal&&(a=e.goal.x,o=e.goal.z)}else if(e.goal)a=e.goal.x,o=e.goal.z;else return 0;let s=a-e.pos.x,c=o-e.pos.z,l=Math.hypot(s,c);if(l<.05)return 0;let u=Math.min(l,t*n),d=e.pos.x+s/l*u,f=e.pos.z+c/l*u,p=this.game.collider.resolve(d,f,.3);return e.pos.x=p.x,e.pos.z=p.z,e.yaw=Math.atan2(s,c),u/n}think(e,t,n){let r=this.def,i=this.game,a=n.filter(e=>e.alive&&!od(r.id,...this.cellOf(e.x,e.z))),o=null,s=1/0;for(let t of a){let n=Math.hypot(t.x-e.pos.x,t.z-e.pos.z);n<s&&(s=n,o=t)}let c=t=>i.collider.los(e.pos.x,e.pos.z,t.x,t.z);switch(e.kind){case`hound`:case`skinstealer`:{let n=e.kind===`skinstealer`?5:e.kind===`hound`?4.8:4.6;if(o&&s<(e.kind===`hound`?16:20)&&c(o)&&(s<7||o.lit||i.world.sampleE(o.x,o.z)>.12)&&(e.kind===`skinstealer`&&e.state!==`chase`&&s>4?e.state=`stalk`:e.state!==`chase`&&e.state!==`notice`&&(e.state=`notice`,e.target=o,e.timer=.9,i.audio.play(`crawler_click`,{pos:e.pos,gain:.9,occlude:!0,reverb:.3}),o.id===`me`&&i.audio.duck(.75,.2,1.4,3))),e.state===`notice`&&e.target){e.yaw=Math.atan2(e.target.x-e.pos.x,e.target.z-e.pos.z),e.play(`idle`,.1);let n=e.timer;e.timer-=t,n>oy&&e.timer<=oy&&e.target.id===`me`&&this.sting(e.kind===`skinstealer`?`skinstealer`:`hound`),e.timer<=0&&(i.audio.play(`crawler_scream`,{pos:e.pos,gain:1,reverb:.4,occlude:!0,rate:e.kind===`skinstealer`?.82:e.kind===`hound`?.9:1}),this.onChase?.(),e.state=`chase`,e.timer=6,e.kind===`skinstealer`&&(e.reveal=.001));break}if(e.state===`stalk`&&o){e.goal={x:o.x,z:o.z};let n=this.moveAlong(e,1.35,t);e.play(n>.2?`walk`:`idle`),s<4.5&&(e.state=`chase`);break}if(e.state===`chase`&&e.target){let r=a.find(t=>t.id===e.target.id);if(!r){e.state=`wander`;break}e.goal={x:r.x,z:r.z},c(r)&&(e.timer=6),e.timer-=t,Math.hypot(r.x-e.pos.x,r.z-e.pos.z)<2.2&&e.kind!==`skinstealer`?e.play(`lunge`,.1,!0):e.play(e.kind===`skinstealer`?`run`:`crawl`,.15);let o=this.moveAlong(e,n,t);e.mixer&&e.kind!==`skinstealer`&&(e.mixer.timeScale=.6+o/2.5),e.stepT-=o/1.2*t,e.stepT<=0&&(e.stepT=1,i.audio.play(`crawler_step`,{pos:e.pos,gain:.7,occlude:!0,reverb:.3})),e.timer<=0&&(e.state=`investigate`,e.goal={x:r.x,z:r.z});break}for(let t of this.noiseEvents)Math.hypot(t.x-e.pos.x,t.z-e.pos.z)<t.r&&(e.state=`investigate`,e.goal={x:t.x,z:t.z},e.timer=10);if(e.state===`investigate`){e.timer-=t;let n=this.moveAlong(e,2.2,t);e.play(e.kind===`skinstealer`?`walk`:`crawl`),e.mixer&&e.kind!==`skinstealer`&&(e.mixer.timeScale=.5+n/3),(e.timer<=0||e.goal&&Math.hypot(e.goal.x-e.pos.x,e.goal.z-e.pos.z)<1)&&(e.state=`wander`),Math.random()<t*.5&&i.audio.play(`crawler_click`,{pos:e.pos,gain:.6,occlude:!0});break}if(!e.goal||Math.hypot(e.goal.x-e.pos.x,e.goal.z-e.pos.z)<1||Math.random()<t*.05){let t=this.rng.range(0,Math.PI*2);e.goal={x:e.pos.x+Math.cos(t)*10,z:e.pos.z+Math.sin(t)*10},o&&Math.random()<.5&&(e.goal={x:(e.goal.x+o.x)/2,z:(e.goal.z+o.z)/2})}let r=this.moveAlong(e,e.kind===`skinstealer`?1.1:1,t);e.play(r>.2?e.kind===`skinstealer`?`walk`:`crawl`:`idle`),e.mixer&&e.kind!==`skinstealer`&&(e.mixer.timeScale=r>.2?.5:1),Math.random()<t*.15&&i.audio.play(e.kind===`hound`?`dweller_knock`:`crawler_click`,{pos:e.pos,gain:.5,occlude:!0,reverb:.4});break}case`howler`:{let n=this.visibleToCamera(e.pos,1.6)&&i.player.alive,r=[...this.remoteTargets(),...this.game.bots.targets()].some(t=>{if(!t.alive||t.fx===void 0||t.fz===void 0)return!1;let n=e.pos.x-t.x,r=e.pos.z-t.z,i=Math.hypot(n,r);return i<28&&i>.01&&(n*t.fx+r*t.fz)/i>Math.cos(50*Math.PI/180)&&c(t)}),a=n||r;o&&(e.goal={x:o.x,z:o.z},a?(e.play(`idle`,.05),e.yaw=Math.atan2(o.x-e.pos.x,o.z-e.pos.z),e.seen+=t,e.moved>.6&&n&&(this.sting(`howler`,.85)&&i.audio.play(`breath_panic`,{gain:.5}),e.moved=0)):(e.timer-=t,e.timer<=0&&(e.timer=.12+Math.random()*.1,this.moveAlong(e,(s>12?9:6.5)*2.2,.1)),e.play(`walk`,.05),e.state=`chase`,e.moved+=t)),e.watched=a,e.life>90&&!a&&s>22&&(e.life=999);break}case`faceling`:{let n=o?s:1/0;if(o&&n<14&&c(o)){if(e.yaw=Math.atan2(o.x-e.pos.x,o.z-e.pos.z),n<4.5){e.goal={x:e.pos.x-(o.x-e.pos.x),z:e.pos.z-(o.z-e.pos.z)};let n=this.moveAlong(e,1.3,t);e.play(n>.2?`walk`:`idle`,.2)}else e.play(e.seen>3?`tilt`:`idle`,.3,e.seen>3),e.seen+=t}else{if(e.seen=0,!e.goal||Math.random()<t*.1){let t=Math.random()*Math.PI*2;e.goal={x:e.pos.x+Math.cos(t)*12,z:e.pos.z+Math.sin(t)*12}}let n=this.moveAlong(e,.9,t);e.play(n>.2?`walk`:`idle`,.3)}e.state=`wander`,e.life>120&&s>25&&(e.life=999);break}case`smiler`:{if(!o)break;let n=i.world.sampleE(e.pos.x,e.pos.z),r=a.find(t=>t.lit&&Math.hypot(t.x-e.pos.x,t.z-e.pos.z)<14&&c(t)),l=r&&r.id===`me`?this.visibleToCamera(e.pos,1.4):!!r;if(e.visible=n>.2&&e.state!==`chase`?Math.max(0,e.visible-t):Math.min(1,e.visible+t*.5),l?e.seen+=t:e.seen=Math.max(0,e.seen-t*.5),e.seen>1.2&&e.state!==`chase`&&(e.state=`chase`,e.target=r,e.timer=7,i.audio.play(`smiler_hiss`,{pos:e.pos,gain:1,reverb:.4}),r.id===`me`&&this.sting(`smiler`)),e.state===`chase`&&e.target){let n=a.find(t=>t.id===e.target.id);n&&(e.goal={x:n.x,z:n.z},this.moveAlong(e,5.6,t)),e.timer-=t,e.timer<=0&&(e.state=`lurk`)}else e.state=`lurk`,s<6&&(e.goal={x:e.pos.x+(e.pos.x-o.x),z:e.pos.z+(e.pos.z-o.z)},this.moveAlong(e,1.2,t));e.visible<=0&&e.life>5&&(e.life=999);break}}}snapshot(){return this.list.map(e=>({i:e.id,k:e.kind,x:+e.pos.x.toFixed(2),z:+e.pos.z.toFixed(2),y:+e.yaw.toFixed(2),a:e.anim,v:+e.visible.toFixed(2),m:e.mimicName||void 0}))}lastSnap=0;async applySnapshot(e){if(!Array.isArray(e))return;let t=performance.now(),n=Math.min(2,Math.max(.05,(t-this.lastSnap)/1e3));this.lastSnap=t;let r=[`hound`,`howler`,`smiler`,`skinstealer`,`faceling`],i=this.game.player.pos,a=e.slice(0,16).filter(e=>e&&Number.isInteger(e.i)&&r.includes(e.k)&&[e.x,e.z,e.y,e.v].every(e=>typeof e==`number`&&Number.isFinite(e))&&Math.abs(e.x)<1e5&&Math.abs(e.z)<1e5),o=new Set(a.map(e=>e.i));for(let e of[...this.list])o.has(e.id)||(this.remove(e),this.list.splice(this.list.indexOf(e),1));for(let e of a){let t=this.list.find(t=>t.id===e.i);if(!t){if(Math.hypot(e.x-i.x,e.z-i.z)<6)continue;t=await this.spawn(e.k,e.x,e.z),this.nextId--,t.id=e.i}let r=e.x-t.netTarget.x,a=e.z-t.netTarget.z,o=Math.hypot(r,a),s=7*n+.5,c=o>s&&t.netTarget.lengthSq()>0?s/o:1;t.netTarget.set(t.netTarget.lengthSq()>0?t.netTarget.x+r*c:e.x,0,t.netTarget.lengthSq()>0?t.netTarget.z+a*c:e.z),t.yaw=e.y,t.visible=Math.max(0,Math.min(1,e.v)),typeof e.a==`string`&&t.actions.has(e.a)&&t.play(e.a),t.state=e.a===`crawl`||e.a===`run`||e.a===`lunge`?`chase`:`wander`}}},ly=null;function uy(){return ly||=Ff(`avatar`).then(e=>(e.scene.traverse(e=>{let t=e;if(!t.isMesh)return;t.castShadow=!0,t.frustumCulled=!1;let n=(Array.isArray(t.material)?t.material:[t.material]).map(e=>{let n=e.clone();return t.geometry.getAttribute(`color`)&&(n.vertexColors=!0),n.name.startsWith(`Glow`)&&(n.emissiveIntensity=4),bd(n)});t.material=n.length===1?n[0]:n}),{scene:e.scene,clips:e.animations})),ly}var dy={hoodie_olive:10200442,hoodie_red:14697786,hoodie_blue:5929176,hazmat_yellow:16765498,janitor_grey:9409690};function fy(e){let t=document.createElement(`canvas`);t.width=256,t.height=64;let n=t.getContext(`2d`);n.font=`600 22px Inter, system-ui, sans-serif`,n.textAlign=`center`,n.fillStyle=`rgba(0,0,0,0.45)`;let r=Math.min(250,n.measureText(e).width+20);n.fillRect(128-r/2,14,r,36),n.fillStyle=`#e8e2c8`,n.fillText(e,128,42);let i=new xa(t);i.colorSpace=Ue;let a=new ri(new Ur({map:i,depthTest:!0,transparent:!0}));return a.scale.set(.9,.225,1),a.position.y=2,a}var py=class{root=new jn;mixer=null;actions=new Map;cur=``;light=null;tag=null;ready;constructor(e,t=!0,n=`hoodie_olive`){if(this.ready=uy().then(({scene:e,clips:t})=>{let r=Sd(e),i=dy[n]??16777215;r.traverse(e=>{let t=e;if(!t.isMesh)return;let n=(Array.isArray(t.material)?t.material:[t.material]).map(e=>{if(!/hoodie/i.test(e.name))return e;let t=e.clone();return t.color.multiply(new G(i)),bd(t)});t.material=n.length===1?n[0]:n}),this.root.add(r,ny(.42,.34)),this.mixer=new ps(r);for(let e of t)this.actions.set(e.name,this.mixer.clipAction(e));this.play(`idle`)}),e&&(this.tag=fy(e),this.root.add(this.tag)),t){let e=new Lo(16773596,0,16,.4,.6,1.8);e.position.set(-.28,1.2,.2);let t=new An;t.position.set(-.28,.9,6),this.root.add(e,t),e.target=t,this.light=e}}play(e){if(e===this.cur||!this.actions.has(e))return;let t=this.actions.get(e);t.reset().play();let n=this.actions.get(this.cur);n&&n.crossFadeTo(t,.25,!1),this.cur=e}locomote(e,t,n){t?this.play(e>.2?`crouchwalk`:`crouch`):e>3.6?this.play(`run`):e>.25?this.play(`walk`):this.play(`idle`),this.mixer&&(this.mixer.timeScale=this.cur===`walk`?Math.max(.5,e/2):this.cur===`run`?e/5:this.cur===`crouchwalk`?Math.max(.5,e/1.2):1,this.mixer.update(n))}setFlashlight(e){this.light&&(this.light.intensity=e?22:0)}dispose(){this.root.removeFromParent(),this.mixer?.stopAllAction()}},my=[`Marisol`,`Dex`,`Okonkwo`,`Juniper`,`Tomasz`,`Priya`,`Hollis`],hy=[[1,0],[-1,0],[0,1],[0,-1]],gy=class{name;avatar;slot;pos=new H;vel=new V;yaw=0;lookYaw=0;path=[];repath=0;alive=!0;flash=!1;mode=`follow`;modeT=0;respawn=0;carry=0;stuckT=0;pathKey=``;bestD=1/0;progT=0;stepPhase=0;idleLookT=0;scoutGoal=null;threatSeen=new Set;constructor(e,t,n){this.name=e,this.avatar=t,this.slot=n}},_y=class{game;list=[];root=new jn;enabled=!1;def=null;trail=[];stillT=0;exitKnown=!1;pingedItems=new Set;constructor(e){this.game=e,e.scene.add(this.root)}names(){return this.list.map(e=>e.name)}enable(e){this.enabled=!0;let t=Math.floor(Math.random()*my.length);for(let n=0;n<e;n++){let e=my[(t+n)%my.length],r=new py(e,!0,[`hoodie_red`,`hoodie_blue`,`janitor_grey`][n%3]),i=new gy(e,r,n);this.root.add(r.root),this.list.push(i)}}setLevel(e){this.def=e;let t=this.game.player.pos;this.trail=[t.clone()],this.exitKnown=!1,this.pingedItems.clear(),this.list.forEach((e,n)=>{e.pos.set(t.x+Math.cos(n*2)*1.2,0,t.z+Math.sin(n*2)*1.2),e.vel.set(0,0),e.path=[],e.alive=!0,e.mode=`follow`,e.avatar.root.visible=!0})}targets(){return this.list.map(e=>({id:`bot:`+e.name,x:e.pos.x,z:e.pos.z,alive:e.alive,lit:e.flash,bot:!0,fx:Math.sin(e.yaw),fz:Math.cos(e.yaw)}))}cell(e,t){let n=this.def.cell;return[Math.floor(e/n),Math.floor(t/n)]}trailPoint(e){let t=this.trail,n=0;for(let r=t.length-1;r>0;r--){let i=t[r].distanceTo(t[r-1]);if(n+i>=e)return t[r].clone().lerp(t[r-1],(e-n)/i);n+=i}return t[0].clone()}bestCell(e,t,n){let r=this.game.world.cache,i=this.def.cell,a=new Set([e.join(`,`)]),o=[e],s=null,c=-1/0;for(let e=0;e<t;e++){let e=[];for(let[t,i]of o)for(let o=0;o<4;o++){if(!r.open(t,i,o))continue;let l=[t+hy[o][0],i+hy[o][1]],u=l.join(`,`);if(a.has(u))continue;a.add(u),e.push(l);let d=n(l[0],l[1]);d>c&&(c=d,s=l)}o=e}return s?{x:(s[0]+.5)*i,z:(s[1]+.5)*i}:null}clear(e,t,n,r,i=.34){let a=this.game.collider,o=n-e,s=r-t,c=Math.hypot(o,s)||1,l=-s/c*i,u=o/c*i;return a.los(e+l,t+u,n+l,r+u)&&a.los(e-l,t-u,n-l,r-u)}visibleToPlayer(e){let t=this.game.camera,n=e.clone().setY(1.2).project(t);return n.z>1||Math.abs(n.x)>1.1||Math.abs(n.y)>1.1?!1:this.game.collider.los(t.position.x,t.position.z,e.x,e.z)}ping(e,t,n){}update(e){if(!this.enabled||!this.def||!this.game.world)return;let t=this.game,n=this.def,r=t.player.pos,i=n.cell,a=this.trail[this.trail.length-1];(!a||a.distanceTo(r)>.8)&&(this.trail.push(r.clone()),this.trail.length>60&&this.trail.shift()),this.stillT=t.player.speed<.3?this.stillT+e:0;let o=t.objects?.interactables.find(e=>e.kind===`exit`);for(let a of this.list){if(!a.alive){a.respawn-=e,a.respawn<=0&&!this.visibleToPlayer(this.trailPoint(6))&&(a.alive=!0,a.pos.copy(this.trailPoint(6)),a.avatar.root.visible=!0);continue}let s=od(n.id,...this.cell(a.pos.x,a.pos.z)),c=null,l=1/0;for(let e of t.entities.list){let n=Math.hypot(e.pos.x-a.pos.x,e.pos.z-a.pos.z);e.kind!==`faceling`&&n<16&&e.visible>.4&&n<l&&t.collider.los(a.pos.x,a.pos.z,e.pos.x,e.pos.z)&&(c={pos:e.pos,kind:e.kind,id:e.id},l=n),n<.9&&(e.state===`chase`||e.kind===`howler`)&&!s&&(a.alive=!1,a.respawn=25,a.avatar.root.visible=!1,a.avatar.setFlashlight(!1),t.audio.play(`crawler_scream`,{pos:a.pos,gain:.8,occlude:!0}))}if(!a.alive)continue;c&&!a.threatSeen.has(c.id)&&(a.threatSeen.add(c.id),this.ping(c.pos,`threat`,c.kind===`howler`?`Don't look away`:c.kind===`smiler`?`Lights off`:`Run`),t.audio.play(`breath_in`,{pos:a.pos,gain:.35,rate:1.1,occlude:!0})),o&&!this.exitKnown&&Math.hypot(o.pos.x-a.pos.x,o.pos.z-a.pos.z)<18&&t.collider.los(a.pos.x,a.pos.z,o.pos.x,o.pos.z)&&(this.exitKnown=!0,this.ping(o.pos.clone(),`exit`,`Way out`));for(let e of t.objects?.interactables??[]){if(e.kind!==`pickup`)continue;let n=Math.hypot(e.pos.x-a.pos.x,e.pos.z-a.pos.z);n<1&&a.carry<2?(t.objects.consume(e.data),a.carry++,t.audio.play(`bottle_open`,{pos:a.pos,gain:.3,rate:1.3})):n<10&&!this.pingedItems.has(e.id)&&t.collider.los(a.pos.x,a.pos.z,e.pos.x,e.pos.z)&&(this.pingedItems.add(e.id),this.ping(e.pos.clone(),`item`,`Almond Water`))}let u=t.player,d=Math.hypot(r.x-a.pos.x,r.z-a.pos.z),f=a.carry>0&&(t.sanity<.5||u.stamina<.2)&&(Y.inventory.almond??0)===0;if(a.modeT-=e,c&&!s)a.mode=c.kind===`howler`?`watch`:c.kind===`smiler`?`avoid`:`flee`,a.modeT=3;else if(f)a.mode=`give`;else if(a.modeT<=0||a.mode===`give`){let e=this.stillT>2.5;a.mode=e?a.slot===0&&Math.random()<.5?`scout`:`idle`:`follow`,a.modeT=e?5+Math.random()*4:2,a.scoutGoal=null}let p=this.trailPoint(2.2+a.slot*1.4),m=0,h=Math.max(1.6,u.speed),g=u.crouching&&d<12,_=null;switch(a.mode){case`follow`:{let e=Math.hypot(p.x-a.pos.x,p.z-a.pos.z);m=e<.4?0:Math.min(5.2,h+Math.max(0,e-1)*1.2);break}case`give`:p=r.clone(),m=d>1.6?Math.min(5,1.5+d):0,d<1.8&&(a.carry--,Y.inventory.almond=(Y.inventory.almond??0)+1,Bu(),a.mode=`follow`);break;case`scout`:if(!a.scoutGoal){let e=new H(0,0,-1).applyQuaternion(t.camera.quaternion),n=o&&this.exitKnown?o.pos:r.clone().addScaledVector(e,20);a.scoutGoal=this.bestCell(this.cell(r.x,r.z),5,(e,t)=>{let a=(e+.5)*i,o=(t+.5)*i,s=Math.hypot(a-r.x,o-r.z);return-Math.hypot(a-n.x,o-n.z)*.3-Math.abs(s-9)+Math.random()*2})}p=a.scoutGoal?new H(a.scoutGoal.x,0,a.scoutGoal.z):p,m=d>14?0:1.8,d>15&&(a.mode=`follow`);break;case`idle`:if(p=this.trailPoint(2.2+a.slot*1.4),m=Math.hypot(p.x-a.pos.x,p.z-a.pos.z)>1.2?1.4:0,a.idleLookT-=e,a.idleLookT<=0){a.idleLookT=1.5+Math.random()*2.5;let[e,n]=this.cell(a.pos.x,a.pos.z),i=[0,1,2,3].filter(r=>t.world.cache.open(e,n,r));if(i.length&&Math.random()<.75){let e=i[Math.floor(Math.random()*i.length)];a.lookYaw=Math.atan2(hy[e][0],hy[e][1])}else a.lookYaw=Math.atan2(r.x-a.pos.x,r.z-a.pos.z)}_=a.lookYaw;break;case`flee`:{let e=c?.pos??a.pos,t=this.bestCell(this.cell(a.pos.x,a.pos.z),6,(t,a)=>{let o=(t+.5)*i,s=(a+.5)*i;return Math.hypot(o-e.x,s-e.z)-.4*Math.hypot(o-r.x,s-r.z)+(od(n.id,t,a)?20:0)});t&&(p=new H(t.x,0,t.z)),m=5,g=!1;break}case`watch`:{let e=c.pos;_=Math.atan2(e.x-a.pos.x,e.z-a.pos.z),Math.hypot(e.x-a.pos.x,e.z-a.pos.z)<5&&(p=a.pos.clone().addScaledVector(new H(a.pos.x-e.x,0,a.pos.z-e.z).normalize(),2),m=1);break}case`avoid`:{let e=c.pos;p=a.pos.clone().addScaledVector(new H(a.pos.x-e.x,0,a.pos.z-e.z).normalize(),4),_=Math.atan2(a.pos.x-e.x,a.pos.z-e.z),m=2.2;break}}let v=this.cell(p.x,p.z),y=this.cell(a.pos.x,a.pos.z);a.repath-=e;let b=v.join(`,`),x=v[0]===y[0]&&v[1]===y[1],S=v[0]===y[0]||v[1]===y[1],C=x||S&&Math.hypot(p.x-a.pos.x,p.z-a.pos.z)<i*3&&this.clear(a.pos.x,a.pos.z,p.x,p.z);if(m>0&&!C&&(b!==a.pathKey||!a.path.length||a.repath<=0)){a.repath=3,a.pathKey=b;let e=v[0]===y[0]&&v[1]===y[1]?null:ry(t.world.cache,y[0],y[1],v[0],v[1],void 0,900);a.path=e?e.slice(1):[]}let w=p.x,T=p.z;if(!C&&a.path.length){for(;a.path.length>1&&Math.hypot((a.path[0][0]+.5)*i-a.pos.x,(a.path[0][1]+.5)*i-a.pos.z)<i*.45;)a.path.shift();let e=0,[t,n]=this.cell(a.pos.x,a.pos.z);for(let r=0;r<Math.min(a.path.length,5);r++){let o=a.path.slice(0,r+1).every(e=>e[0]===t),s=a.path.slice(0,r+1).every(e=>e[1]===n);if((o||s)&&this.clear(a.pos.x,a.pos.z,(a.path[r][0]+.5)*i,(a.path[r][1]+.5)*i))e=r;else break}w=(a.path[e][0]+.5)*i,T=(a.path[e][1]+.5)*i}let E=new V(w-a.pos.x,T-a.pos.z),D=E.length();D>.05?E.multiplyScalar(Math.min(m,D*2.5)/D):E.set(0,0);let O=new V,ee=(e,t,n)=>{let r=a.pos.x-e,i=a.pos.z-t,o=Math.hypot(r,i);o<n&&o>.001&&O.add(new V(r/o,i/o).multiplyScalar((n-o)*3))};ee(r.x,r.z,1.3);for(let e of this.list)e!==a&&e.alive&&ee(e.pos.x,e.pos.z,1.2);E.add(O);let k=m>0?10:14,te=E.clone().sub(a.vel),A=k*e;te.length()>A&&te.setLength(A),a.vel.add(te),a.vel.length()>5.4&&a.vel.setLength(5.4);let ne=t.collider.resolve(a.pos.x+a.vel.x*e,a.pos.z+a.vel.y*e,.28),j=Math.hypot(ne.x-a.pos.x,ne.z-a.pos.z);a.pos.x=ne.x,a.pos.z=ne.z;let M=j/Math.max(e,1e-4),N=Math.hypot(p.x-a.pos.x,p.z-a.pos.z);if(a.progT+=e,N<a.bestD-.5||m===0||N<1?(a.bestD=N,a.progT=0,a.stuckT=0):a.progT>2.5&&(a.stuckT+=a.progT,a.progT=0,a.bestD=N,a.path=[],a.pathKey=``,a.vel.set(Math.random()-.5,Math.random()-.5).multiplyScalar(3)),(d>40||a.stuckT>5)&&!this.visibleToPlayer(a.pos)){let e=this.trailPoint(5+a.slot*1.5);(!this.visibleToPlayer(e)||d>60)&&(a.pos.copy(e),a.vel.set(0,0),a.path=[],a.stuckT=0)}_===null&&M>.2&&(_=Math.atan2(a.vel.x,a.vel.y)),_===null&&d<4&&a.mode===`follow`&&(_=Math.atan2(r.x-a.pos.x,r.z-a.pos.z)),_!==null&&(a.yaw=_),a.flash=a.mode===`watch`||a.mode!==`avoid`&&t.world.sampleE(a.pos.x,a.pos.z)<.12,a.avatar.setFlashlight(a.flash),a.avatar.root.position.copy(a.pos);let re=(a.yaw-a.avatar.root.rotation.y+Math.PI*3)%(Math.PI*2)-Math.PI;a.avatar.root.rotation.y+=re*Math.min(1,e*7),a.avatar.locomote(M,g,e),M>.3&&(a.stepPhase+=M*e/(M>3.6?1.35:g?.7:.9),a.stepPhase>=1&&(a.stepPhase=0,t.audio.play(t.surfaceAt(a.pos.x,a.pos.z),{pos:{x:a.pos.x,y:.1,z:a.pos.z},gain:g?.15:M>3.6?.75:.4,occlude:!0,reverb:.3,hrtf:!1,rate:.95+Math.random()*.1})))}}},vy=1.25,yy=class{canvas;renderer;scene=new zn;camera=new Fo(78,1,.04,90);input;audio=new lp;post;preset;dyn;protos;world=null;collider;player;lights;sparks;objects=null;entities;bots;net=null;ui;mode=`solo`;runMode=`escape`;startLevel=0;roomSeed=0;run=0;level=0;time=0;levelTime=0;running=!1;paused=!1;menuMode=!1;sanity=1;clock=new Xo;breathT=0;breathOut=-1;ambience=[];hum=[];heartT=0;eventT=8;sparkT=1;ventVoices=new Map;ventT=0;coinDist=0;seatStand=null;lifeTime=0;lifeDist=0;surviveT=0;powerEvt=null;fade=1;scare=null;scareLight=new zo(16769218,0,3.2,2);fadeTarget=0;transitioning=!1;nearIt=null;events={};debug={fps:0,calls:0,tris:0};constructor(e){this.canvas=e,this.renderer=new Mu({canvas:e,antialias:!1,powerPreference:`high-performance`,stencil:!1}),this.renderer.toneMapping=0,this.renderer.outputColorSpace=We,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=2,this.renderer.info.autoReset=!1,this.input=new Nu(e),this.sparks=new ap(this.scene),this.scene.add(this.camera),this.scene.add(this.scareLight),this.entities=new cy(this),this.bots=new _y(this),window.addEventListener(`resize`,()=>this.resize())}applyQuality(){let e=this.renderer.getContext(),t=J.quality===`auto`?Ku(e):J.quality;this.preset=Gu[t],jf(Math.min(this.preset.aniso,this.renderer.capabilities.getMaxAnisotropy())),this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.preset.pixelRatioCap)),this.dyn=new qu(this.preset.scale,Math.min(.5,this.preset.scale));let n={scale:this.preset.scale,blurSamples:J.motionBlur>0?this.preset.blurSamples:0,blur:J.motionBlur,bloom:this.preset.bloom,vhs:J.vhs,grain:J.grain,msaa:this.preset.msaa,ssao:this.preset.ssao};return this.post?(this.post.s=n,this.post.buildComposite()):this.post=new tp(this.renderer,n),this.renderer.shadowMap.enabled=this.preset.shadows,this.resize(),t}async setQuality(){let e=this.preset.tier;if(this.applyQuality(),this.lights){this.lights.dispose(this.scene),this.lights=new rp(this.scene,this.preset.lights,this.preset.shadows,this.preset.shadowSize);let e=id[this.level],t=e.fixture===`troffer`?e.height-.08:e.fixture===`highbay`?e.height-1.3:e.height-.2;this.lights.setLevel(t,gd.uLightCol.value);for(let e of this.hum)e?.stop(.2);this.hum=this.lights.slots.map(()=>null)}this.world&&e!==this.preset.tier&&await this.world.swapTier(this.preset.tier)}resize(){let e=innerWidth,t=innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix();let n=this.renderer.getPixelRatio();this.post?.setSize(Math.round(e*n),Math.round(t*n))}async boot(e){e(.05,`Starting renderer`),this.applyQuality(),e(.1,`Loading models`),this.protos=await Rf(t=>e(.1+t*.4,`Loading models`)),e(.55,`Loading sound`),await this.audio.init(),this.audio.setBuffer(`vent_air`,up(this.audio.ctx)),this.audio.setBuffer(`duct_tick`,[1,2,3].map(e=>dp(this.audio.ctx,e))),await this.audio.preload([`step_carpet`,`step_concrete`,`step_metal`,`step_water`,`land_carpet`,`land_concrete`,`land_metal`,`cloth`,`breath_in`,`breath_out`,`breath_panic`,`heartbeat`,`hum`,`spark`,`tube_flicker`,`ballast_click`,`ui_click`,`ui_hover`,`bottle_open`,`drink`]),e(.8,`Almost there`),this.audio.preload(`knock.slam.howl.running.drip.power_down.power_up.crawler_click.crawler_rasp.crawler_scream.crawler_step.watcher_drone.smiler_drone.smiler_hiss.sting_crawler.sting_watcher.sting_smiler.sting_mimic.jumpscare.door_open.hatch_open.elevator_ding.elevator_doors.pipe_groan.steam_hiss.dweller_knock.dweller_groan.tinnitus.outlet_buzz`.split(`.`)),this.lights=new rp(this.scene,this.preset.lights,this.preset.shadows,this.preset.shadowSize),e(1,`Ready`)}seedFor(e){return this.mode===`online`?Ju(this.roomSeed,e):Ju(this.roomSeed,e,this.run)}async start(e,t,n=0){this.mode=e,this.roomSeed=typeof t==`number`?t:Xu(t),this.running=!0,await this.enterLevel(n),this.clock.reset(),this.loop()}async enterLevel(e,t){this.transitioning=!0,this.level=e;let n=id[e];this.world?.dispose(),this.world&&this.scene.remove(this.world.root),this.objects?.dispose(),this.objects&&this.scene.remove(this.objects.root);for(let e of this.ambience)e.stop(.8);for(let e of this.hum)e?.stop(.3);this.hum=[];for(let e of this.ventVoices.values())e.stop(.3);this.ventVoices.clear(),this.powerEvt=null,gd.uPower.value.w=0;let r=this.seedFor(e),i=new Uf(r,e,this.protos,this.preset.radius);await i.loadMaterials(this.preset.tier),this.world=i,this.scene.add(i.root),this.collider=new Gf(i.cache),this.player||(this.player=new cp(this.camera,this.input,this.collider),this.player.onStep=e=>this.footstep(e),this.player.onBump=e=>this.audio.play(`cloth`,{gain:.3*e,rate:.8})),this.player.collider=this.collider,this.objects=new $v(i,this.collider),this.objects.noExit=this.runMode===`endless`&&!this.menuMode,this.scene.add(this.objects.root),i.onChunkLoaded=e=>void this.objects?.syncChunk(e),i.onChunkUnloaded=e=>this.objects?.unloadChunk(e),await this.objects.buildHub(),gd.uLightCol.value.setRGB(...n.lightColor),gd.uAccentCol.value.setRGB(...n.accentColor),gd.uAmbient.value=n.ambient,gd.uFogCol.value.setRGB(...n.fogColor),gd.uBounceCol.value.setRGB(...n.bounceColor),gd.uFogDensity.value=n.fogDensity,gd.uWet.value=n.id===1?.8:n.id===2?.3:.25;let a=this.post.composite.uniforms;a.uTint.value.set(...n.grade.tint),a.uSat.value=n.grade.saturation,a.uContrast.value=n.grade.contrast,a.uLift.value=n.grade.lift,a.uExposure.value=n.exposure,this.post.vhs.uniforms.uHaze.value=n.id===2?.6:0;let o=n.fixture===`troffer`?n.height-.08:n.fixture===`highbay`?n.height-1.3:n.height-.2;this.lights.setLevel(o,gd.uLightCol.value),this.camera.far=n.id===1?120:80;let s=t??(e===0?{x:Qv.x,z:Qv.z}:ud(n,this.run));this.player.teleport(s.x,s.z,e===0?Math.PI*.75:0),this.player.alive=!0,this.player.frozen=!1,await i.prime(s.x,s.z),this.audio.setReverb(n.audio.ir),await this.audio.preload([n.audio.amb]);let c=this.audio.play(n.audio.amb,{loop:!0,gain:.55,bus:`amb`});this.ambience=[c].filter(Boolean),this.hum=this.lights.slots.map(()=>null),this.entities.setLevel(n,r),this.bots.setLevel(n),this.levelTime=0,this.sanity=Math.max(this.sanity,.6),this.post.resetHistory(this.camera),this.fade=1,this.fadeTarget=0,this.transitioning=!1,this.events.onLevel?.(n),this.net?.onLevelChanged(e)}surfaceAt(e,t){let n=id[this.level];if(!this.world)return`step_carpet`;let r=this.world.cache.zone(Math.floor(e/n.cell),Math.floor(t/n.cell));return n.surface===`carpet`?r===4&&Math.random()<.5?`step_water`:`step_carpet`:n.surface===`concrete`?r===4&&Math.random()<.6?`step_water`:`step_concrete`:`step_metal`}footstep(e){let t=id[this.level],n=this.player.pos;if(e.landing)this.audio.play(`land_${t.surface}`,{gain:.5+.4*e.loudness,reverb:.25});else{let t=this.surfaceAt(n.x,n.z),r=(this.player.crouching?.25:this.player.sprinting?.95:.5)*(t===`step_metal`?.7:1);this.audio.play(t,{gain:r,rate:.94+Math.random()*.12,pan:e.foot*.18,reverb:this.player.sprinting?.3:.18}),Math.random()<(this.player.sprinting?.5:.18)&&this.audio.play(`cloth`,{gain:.12+(this.player.sprinting?.1:0),rate:.9+Math.random()*.2})}this.entities.noise(n.x,n.z,e.loudness*(e.landing?16:18),`player`),this.net?.sendStep(e.loudness)}loop=()=>{if(!this.running)return;requestAnimationFrame(this.loop),this.clock.update();let e=this.clock.getDelta();this.debug.fps=this.debug.fps*.95+1/Math.max(e,.001)*.05;let t=Math.min(e,1/20);this.frame(t)};frame(e){let t=this.world;if(!t||this.transitioning){this.input.endFrame();return}this.time+=e,this.levelTime+=e,gd.uTime.value=this.time;let n=this.player,r=this.input;if(this.menuMode){n.frozen=!0,n.update(e);let t=this.time*.05;this.camera.position.set(Qv.x+Math.cos(t)*1.6,1.55+Math.sin(this.time*.7)*.015,Qv.z+Math.sin(t)*1.6),this.camera.rotation.set(.02+Math.sin(this.time*.31)*.02,-t*1.6+2.2,Math.sin(this.time*.23)*.01,`YXZ`)}else this.paused||(n.frozen=!1,n.seated&&([`KeyW`,`KeyA`,`KeyS`,`KeyD`,`Space`].some(e=>r.down(e))||r.hit(`KeyE`)?(n.seated=null,this.seatStand&&n.teleport(this.seatStand.x,this.seatStand.z,n.yaw),this.audio.play(`cloth`,{gain:.4,rate:1.1})):this.sanity=Math.min(1,this.sanity+e*.05)),n.update(e),(r.hit(`KeyF`)||r.pad()?.flash&&!this.lastPadFlash)&&(n.flashlight=!n.flashlight,this.audio.play(`ui_click`,{gain:.5,rate:.6})),this.lastPadFlash=!!r.pad()?.flash,(r.hit(`KeyE`)||r.hit(`Mouse0`)||r.pad()?.use)&&this.interact());t.update(n.pos.x,n.pos.z),t.updateStates(this.time);let i=this.lights.flashlight,a=new H(0,0,-1).applyQuaternion(this.camera.quaternion),o=new H(1,0,0).applyQuaternion(this.camera.quaternion);i.position.copy(this.camera.position).addScaledVector(o,.18).add(new H(0,-.2,0));let s=this.camera.position.clone().addScaledVector(a,6);this.lights.flashTarget.position.lerp(s,rd(14,e));let c=n.battery<.15&&Math.random()<.1?.2:1,l=this.beamDistance(a);this.beamScale+=(Math.min(1,Math.max(.06,(l/3.2)**1.7))-this.beamScale)*rd(10,e),i.intensity=n.flashlight?38*this.beamScale*c*(.4+.6*Math.min(1,n.battery*3)):0;let u=Y.flashlight===`torch_pro`;u&&(i.intensity*=1.5),n.flashlight&&(n.battery=Math.max(0,n.battery-e/(u?840:420))),n.battery<=0&&(n.flashlight=!1),this.updatePower(e),this.lights.update(t,this.camera,e,this.time,1),gd.uCamE.value=t.sampleE(n.pos.x,n.pos.z)*np(n.pos.x,n.pos.z)+(n.flashlight?.25:0);let d=id[this.level],f=Math.floor(n.pos.x/d.cell),p=Math.floor(n.pos.z/d.cell),m=t.cache.zone(f,p),h=od(this.level,f,p),g=gd.uCamE.value;this.entities.update(e,h||this.menuMode),this.bots.update(e);let _=this.entities.threat(n.pos),v=g<.15||m===3;this.sanity=td(this.sanity+e*(h?.05:v?-.006:.0015)-e*_*.03,0,1),n.fear=td(_*1.2+(1-this.sanity)*.5+(v&&!n.flashlight?.15:0),0,1),this.post.composite.uniforms.uDesat.value=(1-this.sanity)*.5,this.post.vhs.uniforms.uGlitch.value=Math.max(0,_-.6)*.6+(this.sanity<.2?.1*Math.random():0),this.scare&&this.updateScare(e),!h&&n.alive&&!this.menuMode&&(this.coinDist+=n.speed*e,this.lifeDist+=n.speed*e,this.lifeTime+=e,this.surviveT+=e,this.coinDist>60&&(this.coinDist=0,Uu(1+this.level,`exploring`)),this.surviveT>90&&(this.surviveT=0,Uu(2+this.level,`survived`))),this.objects?.update(this.time);let y=n.seated?null:this.objects?.nearest(n.pos)??null;y!==this.nearIt&&(this.nearIt=y,this.ui?.prompt(y?y.label:null,y?.kind)),this.updateAudio(e,m,h,_),this.sparks.update(e),this.net?.update(e),this.fade+=(this.fadeTarget-this.fade)*Math.min(1,e*2.5),this.post.composite.uniforms.uFade.value=this.fade,this.dyn.sample(e)&&(this.post.s.scale=this.dyn.scale,this.resize()),this.renderer.info.reset(),this.post.render(this.scene,this.camera,this.time),this.debug.calls=this.renderer.info.render.calls,this.debug.tris=this.renderer.info.render.triangles,this.ui?.update(e),this.audio.updateListener(this.camera,e),r.endFrame()}lastPadFlash=!1;updateAudio(e,t,n,r){let i=this.player,a=td((1-i.stamina-.25)/.75,0,1),o=td((i.fear-.35)/.65,0,1),s=Math.max(a,o);if(s>.02&&i.alive&&!this.menuMode){this.breathT-=e;let t=2.8-s*1.9;this.breathT<=0&&(this.breathT=t*(.9+Math.random()*.2),this.breathOut=t*.42,this.audio.play(`breath_in`,{gain:.08+s*.2,rate:.96+Math.random()*.08})),this.breathOut>0&&(this.breathOut-=e,this.breathOut<=0&&this.audio.play(o>.5&&Math.random()<.5?`breath_panic`:`breath_out`,{gain:.1+s*.24,rate:.95+Math.random()*.08}))}else this.breathT=Math.min(this.breathT,.4);if(i.fear>.35&&i.alive&&(this.heartT-=e,this.heartT<=0&&(this.heartT=60/(70+i.fear*80),this.audio.play(`heartbeat`,{gain:(i.fear-.3)*.9}))),this.lights.slots.forEach((e,t)=>{let n=this.hum[t];if(!n&&e.key>=0&&(n=this.audio.play(`hum`,{loop:!0,gain:0,pos:e.light.position,bus:`amb`,hrtf:!1,refDistance:1,maxDistance:18,rate:.98+e.key%7/7*.05}),this.hum[t]=n),n){n.setPos(e.light.position.x,e.light.position.y,e.light.position.z);let t=id[this.level].id===0?.1:.06;n.gain.gain.setTargetAtTime(e.light.intensity>.01?t*Math.min(1,e.light.intensity/6):0,this.audio.ctx.currentTime,.05)}}),Math.random()<e*.4){let e=this.lights.slots[Math.floor(Math.random()*this.lights.slots.length)];e.key>=0&&e.light.intensity<3&&e.light.intensity>.05&&this.audio.play(`tube_flicker`,{pos:e.light.position,gain:.35,reverb:.2})}if(this.sparkT-=e,this.sparkT<=0&&this.world){this.sparkT=.8+Math.random()*2.5;for(let e of this.world.chunks.values())for(let t of e.sparks)Math.hypot(t.x-i.pos.x,t.z-i.pos.z)<14&&Math.random()<.35&&(this.sparks.burst(t.x,t.y+.02,t.z,t.nx,t.nz,10+Math.floor(Math.random()*25)),this.audio.play(`spark`,{pos:{x:t.x,y:t.y,z:t.z},gain:.8,reverb:.3,occlude:!0}),this.entities.noise(t.x,t.z,6,`spark`))}if(this.ventT-=e,this.ventT<=0&&this.world){this.ventT=.4;let e=[];for(let t of this.world.chunks.values())for(let n of t.layout.props){if(n.kind!==`vent_wall`&&n.kind!==`vent_ceiling`)continue;let t=Math.hypot(n.x-i.pos.x,n.z-i.pos.z);t<12&&e.push({k:`${n.x.toFixed(2)},${n.z.toFixed(2)}`,x:n.x+Math.sin(n.rot)*.05,y:n.y,z:n.z+Math.cos(n.rot)*.05,d:t})}e.sort((e,t)=>e.d-t.d);let t=new Set(e.slice(0,3).map(e=>e.k));for(let[e,n]of this.ventVoices)(!t.has(e)||!this.audio.voices.has(n))&&(n.stop(.6),this.ventVoices.delete(e));for(let t of e.slice(0,3)){if(this.ventVoices.has(t.k))continue;let e=this.audio.play(`vent_air`,{loop:!0,gain:0,pos:t,bus:`amb`,refDistance:.6,maxDistance:14,occlude:!0,rate:.92+Math.abs(t.x*7.3+t.z*3.1)%1*.16});e&&(e.baseGain=.22,e.gain.gain.setTargetAtTime(.22,this.audio.ctx.currentTime,.5),this.ventVoices.set(t.k,e))}if(e.length&&e[0].d<7&&Math.random()<.035){let t=e[0];this.audio.play(`duct_tick`,{pos:t,gain:.5,rate:.85+Math.random()*.3,reverb:.35,occlude:!0})}}if(this.eventT-=e,this.eventT<=0&&!n){this.eventT=14+Math.random()*30;let e=id[this.level].id,t=e===2?[`pipe_groan`,`steam_hiss`,`dweller_knock`,`drip`,`knock`,`slam`]:e===1?[`drip`,`slam`,`howl`,`knock`,`running`]:[`knock`,`slam`,`howl`,`running`,`knock`,`drip`],n=t[Math.floor(Math.random()*t.length)],r=Math.random()*Math.PI*2,a=10+Math.random()*20;this.audio.play(n,{pos:{x:i.pos.x+Math.cos(r)*a,y:1.5,z:i.pos.z+Math.sin(r)*a},gain:.8,refDistance:6,maxDistance:80,reverb:.5}),Math.random()<.12&&e!==2&&this.levelTime>90&&this.startPowerDown()}}startPowerDown(){this.powerEvt||(this.powerEvt={t:0,dir:-1,r:70},this.audio.play(`power_down`,{gain:.9,reverb:.4}),gd.uPower.value.set(this.player.pos.x,this.player.pos.z,70,1))}updatePower(e){let t=this.powerEvt;if(!t)return;t.t+=e;let n=gd.uPower.value;if(t.dir<0)t.r=Math.max(-5,t.r-e*45),t.t>9&&(t.dir=1,t.t=0,n.x=this.player.pos.x,n.y=this.player.pos.z,this.audio.play(`power_up`,{gain:.8,reverb:.4}));else if(t.r+=e*30,t.r>90){this.powerEvt=null,n.w=0;return}n.z=t.r}beamScale=1;beamDistance(e){let t=this.camera.position,n=id[this.level].height,r=12;e.y>.02&&(r=Math.min(r,(n-t.y)/e.y)),e.y<-.02&&(r=Math.min(r,t.y/-e.y));let i=Math.hypot(e.x,e.z);if(i>.05){let n=e.x/i,a=e.z/i;for(let e of[.4,.8,1.3,2,3,4.5,6.5]){if(e/i>r)break;if(!this.collider.los(t.x,t.z,t.x+n*e,t.z+a*e)){r=Math.min(r,e/i);break}}}return r}interact(){let e=this.nearIt;if(e)switch(this.audio.resume(),e.kind){case`pickup`:this.objects?.consume(e.data),Y.inventory.almond=(Y.inventory.almond??0)+1,Bu(),this.audio.play(`bottle_open`,{gain:.5}),Uu(3,`almond water`),this.net?.sendPickup(e.data);break;case`exit`:this.useExit();break;case`shop`:case`locker`:case`board`:this.ui?.openPanel(e.kind);break;case`couch`:case`armchair`:{let t=e.data;this.seatStand={x:t.sx,z:t.sz},this.player.seated={x:t.x,z:t.z},this.audio.play(`cloth`,{gain:.5,rate:.8});break}}}drinkAlmond(){return(Y.inventory.almond??0)<=0?!1:(Y.inventory.almond--,Bu(),this.sanity=Math.min(1,this.sanity+.45),this.player.stamina=1,this.audio.play(`drink`,{gain:.6}),!0)}async useExit(){if(this.transitioning)return;let e=id[this.level];this.player.frozen=!0,this.audio.play(e.exit===`door`?`door_open`:e.exit===`hatch`?`hatch_open`:`elevator_ding`,{gain:.9,reverb:.3}),e.exit===`elevator`&&setTimeout(()=>this.audio.play(`elevator_doors`,{gain:.7}),600),Uu(25+e.id*20+Math.max(0,Math.round(60-this.levelTime/10)),`escaped ${e.name}`),this.fadeTarget=1,await new Promise(e=>setTimeout(e,1800)),this.events.onEscape?.(this.level),this.level<id.length-1?await this.enterLevel(this.level+1):(Y.escapes++,(!Y.bestTime||this.time<Y.bestTime)&&(Y.bestTime=this.time),Bu(),Uu(100,`reached the surface?`),this.run++,this.ui?.showEnding(),await this.enterLevel(0))}async die(e,t){this.player.alive&&(this.player.alive=!1,this.player.frozen=!0,Y.deaths++,Y.inventory={},Bu(),this.post.composite.uniforms.uFadeCol.value.setRGB(0,0,0),this.audio.hush(.04),this.audio.play(`jumpscare`,{gain:1,bus:`sting`}),t?(this.scare={e:t,t:0,q0:this.camera.quaternion.clone(),cut:!1},this.entities.held=t,t.visible=1,t.obj.visible=!0,t.obj.traverse(e=>{let t=e;t.isMesh&&(t.material.opacity=1)}),t.play(t.actions.has(`grab`)?`grab`:t.actions.has(`lunge`)?`lunge`:t.actions.has(`run`)?`run`:`walk`,.05,!0),this.ui?.root.classList.add(`scaring`),await this.until(()=>!this.scare||this.scare.cut),this.ui?.root.classList.remove(`scaring`),this.events.onDeath?.(e),await this.until(()=>!this.scare||this.scare.t>=4.65)):(this.events.onDeath?.(e),this.post.vhs.uniforms.uGlitch.value=1,this.fadeTarget=1,await new Promise(e=>setTimeout(e,3600))),this.endScare(),this.run++,this.sanity=.8,await this.enterLevel(this.startLevel),this.lifeTime=0,this.lifeDist=0,this.ui?.hideDeath())}until(e){return new Promise(t=>{let n=()=>e()?t():setTimeout(n,30);n()})}debugHoldScare=!1;updateScare(e){let t=this.scare;this.debugHoldScare||(t.t+=e);let n=this.camera,r=t.e,i=this.post.vhs.uniforms,a=J.reduceFlashes;if(t.t>=vy){t.cut||(t.cut=!0,this.fade=this.fadeTarget=1,this.post.composite.uniforms.uFade.value=1,this.audio.hush(.02),this.scareLight.intensity=0,r.obj.visible=!1),i.uShock.value=0,i.uGlitch.value=0;return}let o=n.position.clone(),s=new H(r.pos.x-o.x,0,r.pos.z-o.z);s.lengthSq()>.01&&s.lengthSq()<16&&this.collider.los(o.x,o.z,r.pos.x,r.pos.z)||s.set(0,0,-1).applyQuaternion(t.q0).setY(0),s.normalize();let c={hound:.5,howler:.75,smiler:.5,skinstealer:.45},l=1-Math.min(1,t.t/.16),u=(c[r.kind]??.5)+1.1*l*l,d=r.kind===`hound`?-1.15*Math.min(1,t.t/.2)-.25:0;r.obj.position.set(o.x+s.x*u,0,o.z+s.z*u),r.obj.rotation.set(d,Math.atan2(-s.x,-s.z),0,`YXZ`),r.kind===`smiler`&&(r.obj.position.y=o.y-.1),r.obj.updateMatrixWorld(!0);let f=r.obj.getObjectByName(`head`),p=f?f.getWorldPosition(new H).add(new H(0,.08,0)):r.obj.position.clone();if(f){let e=new H(o.x+s.x*u,r.kind===`howler`?p.y:o.y-.03,o.z+s.z*u),t=e.clone().sub(p);r.obj.position.add(t),p.copy(e)}let m=new W().lookAt(o,p,new H(0,1,0)),h=new Pt().setFromRotationMatrix(m),g=Math.min(1,t.t/.12);n.quaternion.copy(t.q0).slerp(h,1-(1-g)**3);let _=(a?.35:1)*(.25+.75*Math.max(0,1-t.t/vy)),v=()=>(Math.random()-.5)*2;n.position.add(new H(v(),v(),v()).multiplyScalar(.03*_)),n.quaternion.multiply(new Pt().setFromEuler(new pn(v()*.03*_,v()*.03*_,v()*.05*_))),n.fov=J.fov-14*Math.min(1,t.t/.08),n.updateProjectionMatrix(),this.scareLight.position.copy(o).addScaledVector(s,.25).add(new H(0,.25,0)),this.scareLight.intensity=(a?3:4)+Math.random()*(a?1:5),i.uShock.value=a?0:t.t<.07?1:Math.max(0,.35-t.t)*.6,i.uGlitch.value=.35+.65*Math.max(0,1-t.t/.5),this.fadeTarget=0}endScare(){this.scare&&(this.scare.e.obj.visible=!0),this.scare=null,this.entities.held=null,this.scareLight.intensity=0,this.post.vhs.uniforms.uShock.value=0}},by=21492,xy=`open-backrooms-lobby-v1`,Sy=[`NA`,`SA`,`EU`,`AF`,`AS`,`OC`],Cy=e=>e.slice(0,16),wy=(e,t)=>`room:${e}~${Cy(t)}`;function Ty(e){let t=/^room:([a-z0-9_-]{1,32})~([0-9a-f]{16})$/.exec(e);return t?{name:t[1],host:t[2]}:null}function Ey(e){let t;try{t=JSON.parse(e.content)}catch{return null}let n=String(t.id??``),r=/^public:(NA|SA|EU|AF|AS|OC):([1-9]|1[0-2])$/.test(n),i=Ty(n);if(!r&&!i||i&&i.host!==Cy(e.pubkey))return null;let a=String(t.region);if(!Sy.includes(a)||Math.abs(e.created_at*1e3-Date.now())>12e4)return null;let o=Math.max(1,Math.min(8,Math.floor(Number(t.players)||1)));return{id:n,name:Dv(Ov(String(t.name??(i?.name||n)),32)),region:a,mode:t.mode===`endless`?`endless`:`escape`,level:Math.max(0,Math.min(2,Math.floor(Number(t.level)||0))),players:o,max:8,locked:!!t.locked&&!r,host:e.pubkey,seen:Date.now()}}function Dy(){return location.origin+location.pathname.replace(/index\.html$/,``)}var Oy=e=>e.toLowerCase().replace(/[^a-z0-9-_]+/g,`-`).replace(/^-+|-+$/g,``).slice(0,32),ky=16e3,Ay=new class{listings=new Map;onChange;unsub=null;since=0;browse(){this.unsub||=(this.since=Date.now(),yv.subscribe({kinds:[by],"#t":[xy],since:Math.floor(Date.now()/1e3)-60},e=>{let t=Ey(e);t&&(this.listings.set(t.id,t),this.onChange?.())}))}stop(){this.unsub?.(),this.unsub=null}byName(e){return this.list().filter(t=>Ty(t.id)?.name===e)}async warm(e){for(this.browse();Date.now()-this.since<ky;)e?.(Math.ceil((ky-(Date.now()-this.since))/1e3)),await new Promise(e=>setTimeout(e,500))}async taken(e,t,n){return await this.warm(n),this.byName(e).some(e=>e.host!==t)}async resolve(e,t){for(this.browse();;){let n=this.byName(e)[0];if(n)return n.id;if(Date.now()-this.since>=ky)return null;t?.(Math.ceil((ky-(Date.now()-this.since))/1e3)),await new Promise(e=>setTimeout(e,500))}}list(e){let t=Date.now();for(let[e,n]of this.listings)t-n.seen>45e3&&this.listings.delete(e);return[...this.listings.values()].filter(t=>!e||t.region===e).sort((e,t)=>t.players-e.players||t.seen-e.seen)}announce(e){yv.publish(by,JSON.stringify({...e,v:1}),[[`t`,xy]])}},jy=`open-backrooms-v1`,My={NA:`North America`,SA:`South America`,EU:`Europe`,AF:`Africa`,AS:`Asia`,OC:`Oceania`};function Ny(){let e=Intl.DateTimeFormat().resolvedOptions().timeZone||``;return/^America\/(Sao_Paulo|Argentina|Santiago|Bogota|Lima|Caracas|Montevideo|La_Paz|Asuncion|Guayaquil)/.test(e)?`SA`:e.startsWith(`America/`)||e.startsWith(`US/`)||e.startsWith(`Canada/`)?`NA`:e.startsWith(`Europe/`)||e===`GMT`||e.startsWith(`Atlantic/`)?`EU`:e.startsWith(`Africa/`)?`AF`:e.startsWith(`Australia/`)||e.startsWith(`Pacific/`)?`OC`:e.startsWith(`Asia/`)||e.startsWith(`Indian/`)?`AS`:`EU`}var Py=class{game;room=null;roomId=``;label=``;peers=new Map;onChat;onPeers;onKicked;onRoomConfig;isHost=!1;hostPeer=``;hostPub=``;kicks=[];banned=new Set;mode=`escape`;startLevel=0;locked=!1;region=Ny();announceT=0;sendPose;sendHello;sendEnt;sendChatA;sendPickA;sendKickA;poseT=0;entT=0;pingT=0;mic=null;pttDown=!1;micOn=!1;root=new jn;constructor(e){this.game=e,e.scene.add(this.root),e.entities.remoteTargets=()=>this.targets()}get selfId(){return Pm}async join(e,t,n,r=!1){this.leave(),this.roomId=e,this.label=t,this.isHost=r,this.locked=!!n,this.hostPeer=``,this.hostPub=r?yv.pubkey:``,this.kicks=[],this.banned.clear();let i=cv({appId:jy,password:n||void 0},e);this.room=i;let[a,o]=Iy(i,`pose`),[s,c]=Iy(i,`hello`),[l,u]=Iy(i,`ent`),[d,f]=Iy(i,`chat`),[p,m]=Iy(i,`pick`),[h,g]=Iy(i,`kick`);return this.sendPose=a,this.sendHello=s,this.sendEnt=l,this.sendChatA=d,this.sendPickA=p,this.sendKickA=h,i.onPeerJoin=e=>{this.hello(e).then(t=>this.sendHello(t,{target:e})),this.isHost&&this.kicks.length&&this.sendKickA(this.kicks,{target:e}),this.mic&&!this.banned.has(e)&&i.addStream(this.mic,{target:e})},i.onPeerLeave=e=>{let t=this.peers.get(e);t&&(this.onChat?.(``,`${t.name} disconnected.`,!0),t.avatar.dispose(),t.voice?.el.remove()),this.peers.delete(e),this.onPeers?.()},c(async(e,{peerId:t})=>{if(this.banned.has(t)||!e||typeof e!=`object`)return;let n=this.peers.get(t),r=Dv(Ov(String(e.name??`Wanderer`),24))||`Wanderer`,i=String(e.outfit)in dy?String(e.outfit):`hoodie_olive`,a=Fy(e.level,0,2);if(!n){if(this.peers.size>=8)return;let e=new py(r,!0,i);this.root.add(e.root),n={id:t,name:r,outfit:i,level:a,avatar:e,pos:new H,target:new H,yaw:0,speed:0,crouch:!1,flash:!1,alive:!0,lastSeen:performance.now(),talking:!1,stepPhase:0,ping:0,chatBudget:5},this.peers.set(t,n),this.onChat?.(``,`${r} joined.`,!0),this.hello(t).then(e=>this.sendHello(e,{target:t}))}n.name=r,n.level=a;let o=Ty(this.roomId);if(o&&!this.isHost&&typeof e.pk==`string`&&Cy(e.pk)===o.host&&await xv(`host:${this.roomId}:${t}`,e.hs,e.pk)){let n=!this.hostPeer;this.hostPeer=t,this.hostPub=e.pk,n&&this.onRoomConfig?.(e.mode===`endless`?`endless`:`escape`,Fy(e.sl,0,2))}this.onPeers?.()}),o((e,{peerId:t})=>{let n=this.peers.get(t);if(!n||this.banned.has(t)||!(e instanceof ArrayBuffer)||e.byteLength<28||e.byteLength>64)return;let r=new Float32Array(e);if(![r[0],r[1],r[2],r[3],r[5]].every(Number.isFinite)||Math.abs(r[0])>1e5||Math.abs(r[1])>1e5)return;let i=r.length>6&&Number.isFinite(r[6])?Math.max(-2,Math.min(6,r[6])):0;n.target.set(r[0],i,r[1]),n.yaw=r[2],n.speed=Math.max(0,Math.min(8,r[3]));let a=r[4]|0;n.crouch=!!(a&1),n.flash=!!(a&2),n.alive=!!(a&4),n.talking=!!(a&8),n.level=Fy(r[5],0,2),n.lastSeen=performance.now()}),u((e,{peerId:t})=>{this.authorityId()===t&&!this.banned.has(t)&&this.game.entities.applySnapshot(e)}),f((e,{peerId:t})=>{let n=this.peers.get(t);if(!n||this.banned.has(t)||!J.chat||!e||n.chatBudget<1)return;--n.chatBudget;let r=Ov(String(e.t??``),200);r&&this.onChat?.(n.name,J.profanityFilter?Dv(r):r)}),m((e,{peerId:t})=>{let n=this.peers.get(t),r=this.game.objects?.interactables.find(t=>t.kind===`pickup`&&t.data===Number(e));!n||this.banned.has(t)||!r||n.level!==this.game.level||Math.hypot(r.pos.x-n.pos.x,r.pos.z-n.pos.z)>3||this.game.objects?.consume(Number(e))}),g(async(e,{peerId:t})=>{if(Array.isArray(e)&&this.hostPub&&t===this.hostPeer){for(let t of e.slice(0,64))if(t&&typeof t.t==`string`&&Number.isFinite(t.ts)&&await xv(`kick:${this.roomId}:${t.t}:${t.ts}`,t.s,this.hostPub)){if(t.t===Pm){this.onKicked?.();return}this.ban(t.t)}}}),i.onPeerStream=(e,t)=>{this.banned.has(t)||this.attachVoice(t,e)},await new Promise(e=>setTimeout(e,3500)),this.peers.size}async joinPublic(e,t){for(let n=1;n<=12;n++){let r=`public:${e}:${n}`;if(t?.(`Searching ${My[e]} world #${n}...`),await this.join(r,`${My[e]} #${n}`)<8)return r}return this.roomId}leave(){for(let e of this.peers.values())e.avatar.dispose(),e.voice?.el.remove();this.peers.clear(),this.room?.leave(),this.room=null,this.isHost=!1,this.hostPeer=``,this.hostPub=``}async kick(e){if(!this.isHost||!this.peers.has(e))return;let t=Date.now(),n={t:e,ts:t,s:await bv(`kick:${this.roomId}:${e}:${t}`)};this.kicks.push(n),this.sendKickA([n]);let r=this.peers.get(e)?.name??`Player`;this.ban(e),this.onChat?.(``,`${r} was removed by the host.`,!0)}ban(e){this.banned.add(e);let t=this.peers.get(e);t&&(t.avatar.dispose(),t.voice?.el.remove(),this.peers.delete(e)),this.onPeers?.()}async hello(e){let t={name:J.name,outfit:Y.outfit,level:this.game.level,v:2};return this.isHost&&e&&(t.pk=yv.pubkey,t.hs=await bv(`host:${this.roomId}:${Pm}`),t.mode=this.mode,t.sl=this.startLevel),t}peerNames(){return[...this.peers.values()].map(e=>e.name)}authorityId(){return[Pm,...[...this.peers.values()].filter(e=>e.level===this.game.level).map(e=>e.id)].sort()[0]}targets(){return[...this.peers.values()].filter(e=>e.level===this.game.level).map(e=>({id:e.id,x:e.pos.x,z:e.pos.z,alive:e.alive,lit:e.flash,fx:-Math.sin(e.yaw),fz:-Math.cos(e.yaw)}))}onLevelChanged(e){if(this.sendHello)for(let e of this.peers.keys())this.hello(e).then(t=>this.sendHello(t,{target:e}))}sendStep(e){}sendPickup(e){this.sendPickA?.(e)}chat(e){e=Ov(e,200),e&&this.room&&(this.sendChatA({n:J.name,t:e}),this.onChat?.(J.name,J.profanityFilter?Dv(e):e))}async enableMic(){if(this.mic)return!0;try{this.mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}});for(let e of this.mic.getAudioTracks())e.enabled=J.micMode===`open`;return this.room?.addStream(this.mic),this.micOn=!0,!0}catch{return!1}}setTalking(e){if(!this.mic)return;let t=J.micMode===`open`||J.micMode===`ptt`&&e;for(let e of this.mic.getAudioTracks())e.enabled=t;this.pttDown=e}attachVoice(e,t){let n=this.peers.get(e);if(!n)return;let r=this.game.audio.ctx,i=document.createElement(`audio`);i.srcObject=t,i.muted=!0,i.play().catch(()=>{}),document.body.appendChild(i);let a=r.createMediaStreamSource(t),o=r.createBiquadFilter();o.type=`lowpass`,o.frequency.value=16e3;let s=r.createGain(),c=r.createPanner();c.panningModel=`HRTF`,c.distanceModel=`inverse`,c.refDistance=1.5,c.maxDistance=40,c.rolloffFactor=1.4;let l=r.createAnalyser();l.fftSize=256,a.connect(l),a.connect(o).connect(s).connect(c).connect(this.game.audio.buses.voice);let u=r.createGain();u.gain.value=.25,c.connect(u).connect(this.game.audio.reverbIn),n.voice={src:a,gain:s,panner:c,filter:o,el:i,level:l}}update(e){if(!this.room)return;let t=this.game,n=t.player;if(this.poseT-=e,this.poseT<=0){this.poseT=1/20;let e=new Float32Array([n.pos.x,n.pos.z,n.yaw,n.speed,+!!n.crouching|(n.flashlight?2:0)|(n.alive?4:0)|(this.pttDown||J.micMode===`open`?8:0),t.level,n.pos.y]);this.sendPose(e.buffer)}let r=this.authorityId()===Pm;t.entities.authority=r,this.announceT-=e;let i=/^public:/.test(this.roomId);if(this.announceT<=0&&(this.isHost||i&&r)){this.announceT=15;let e=/^public:(\w\w):(\d+)$/.exec(this.roomId);Ay.announce({id:this.roomId,name:i&&e?`${My[e[1]]} #${e[2]}`:Ty(this.roomId)?.name??this.label,region:i&&e?e[1]:this.region,mode:this.mode,level:t.level,players:this.peers.size+1,locked:this.locked})}r&&(this.entT-=e,this.entT<=0&&(this.entT=.1,this.peers.size&&this.sendEnt(t.entities.snapshot()))),this.pingT-=e;let a=this.pingT<=0;a&&(this.pingT=3);let o=performance.now();for(let r of this.peers.values()){r.chatBudget=Math.min(5,r.chatBudget+e/2),a&&this.room.ping(r.id).then(e=>r.ping=e).catch(()=>{});let i=r.level===t.level;r.avatar.root.visible=i&&r.alive&&o-r.lastSeen<5e3,r.pos.lengthSq()===0&&r.pos.copy(r.target),r.pos.lerp(r.target,Math.min(1,e*10)),r.avatar.root.position.copy(r.pos);let s=(r.yaw+Math.PI-r.avatar.root.rotation.y+Math.PI*3)%(Math.PI*2)-Math.PI;if(r.avatar.root.rotation.y+=s*Math.min(1,e*10),r.avatar.locomote(r.speed,r.crouch,e),r.avatar.setFlashlight(r.flash&&i),i&&r.speed>.3&&(r.stepPhase+=r.speed*e/(r.speed>3?1.05:.72),r.stepPhase>=1&&(r.stepPhase=0,t.audio.play(t.surfaceAt(r.pos.x,r.pos.z),{pos:{x:r.pos.x,y:.1,z:r.pos.z},gain:r.crouch?.2:r.speed>3?.9:.5,occlude:!0,reverb:.3,hrtf:!1}))),r.voice){let e=t.audio.ctx.currentTime;r.voice.panner.positionX.setTargetAtTime(r.pos.x,e,.05),r.voice.panner.positionY.setTargetAtTime(1.6,e,.05),r.voice.panner.positionZ.setTargetAtTime(r.pos.z,e,.05);let a=t.collider.los(n.pos.x,n.pos.z,r.pos.x,r.pos.z);r.voice.filter.frequency.setTargetAtTime(a?16e3:1100,e,.1),r.voice.gain.gain.setTargetAtTime(i?a?1:.6:0,e,.1)}}}};function Fy(e,t,n){let r=Math.floor(Number(e));return Number.isFinite(r)?Math.max(t,Math.min(n,r)):t}function Iy(e,t){let n=e.makeAction(t);return[(e,t)=>n.send(e,t?{target:t.target}:void 0),e=>n.onMessage=(t,n)=>e(t,n)]}var Q=(e,t=document)=>t.querySelector(e),Ly=e=>{let t=document.createElement(`template`);return t.innerHTML=e.trim(),t.content.firstElementChild},Ry=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),zy=[{id:`almond`,name:`Almond Water`,desc:`Restores sanity and stamina. Press Q to drink.`,price:15,kind:`consumable`},{id:`battery`,name:`Battery Pack`,desc:`Fresh cells for your flashlight. Press R to swap.`,price:10,kind:`consumable`},{id:`torch_pro`,name:`Heavy-Duty Torch`,desc:`Brighter beam, battery lasts twice as long.`,price:150,kind:`upgrade`},{id:`hoodie_red`,name:`Red Hoodie`,desc:`So your friends can find you in the yellow.`,price:60,kind:`outfit`},{id:`hoodie_blue`,name:`Blue Hoodie`,desc:`A calm colour for an uncalm place.`,price:60,kind:`outfit`},{id:`janitor_grey`,name:`Janitor Coveralls`,desc:`Someone has to mop Level 0.`,price:90,kind:`outfit`},{id:`hazmat_yellow`,name:`Hazmat Suit`,desc:`Offers no protection. Looks great.`,price:200,kind:`outfit`}],By={almond:`Almond Water`,battery:`Battery Pack`},Vy=class{game;actions;root;hud;promptEl;chatEl;chatInput;toastsEl;modal=null;chatOpen=!1;chatFadeT=0;titleT=0;inGame=!1;online=!1;onlineLink=``;region=Ny();pings=[];constructor(e,t){this.game=e,this.actions=t,this.root=Q(`#ui`),this.hud=Ly(`<div id="hud" class="hidden">
      <div class="coins"></div>
      <div class="level"></div>
      <div class="fps"></div>
      <div class="talk hidden">● Talking</div>
      <div class="safe hidden">Safe zone</div>
      <div class="cross"></div>
      <div class="prompt hidden"></div>
      <div class="stamina"><i></i></div>
      <div class="bat hidden"><span class="cell"><span class="fill"></span></span></div>
      <div class="inv"></div>
      <div id="title-card"></div>
    </div>`),this.root.append(this.hud),this.promptEl=Q(`.prompt`,this.hud),this.chatEl=Ly(`<div id="chat" class="hidden"><div class="log"></div><input class="hidden interactive" maxlength="200" placeholder="Say something… (Enter to send, Esc to cancel)"></div>`),this.root.append(this.chatEl),this.chatInput=Q(`input`,this.chatEl),this.toastsEl=Ly(`<div id="toasts"></div>`),this.root.append(this.toastsEl),this.root.append(Ly(`<div id="fade"></div>`)),Hu((e,t)=>{e>0&&this.toast(`+${e} BC${t?` · `+t:``}`,`coin`),this.refreshCoins()}),this.chatInput.addEventListener(`keydown`,e=>{if(e.stopPropagation(),e.key===`Enter`){let e=this.chatInput.value.trim();e&&this.game.net?.chat(e),this.closeChat()}else e.key===`Escape`&&this.closeChat()}),window.addEventListener(`keydown`,e=>this.onKey(e)),window.addEventListener(`keyup`,e=>{e.code===`KeyV`&&this.game.net?.setTalking(!1)})}bootScreen(e){let t=Ly(`<div id="boot" class="interactive"><div class="inner">
      <div class="play">OPEN BACKROOMS</div>
      <div class="bar"><i></i></div>
      <div class="label">Loading…</div>
      <button class="start hidden">CLICK TO ENTER</button>
      <div class="warn">Headphones recommended. Contains flashing lights, loud sudden sounds and themes of isolation.<br>Free forever. No accounts, no payments — coins are earned by playing.</div>
    </div></div>`);this.root.append(t);let n=Q(`.bar i`,t),r=Q(`.label`,t),i=Q(`.start`,t);return i.onclick=()=>{t.remove(),e()},{progress:(e,t)=>{n.style.width=`${Math.round(e*100)}%`,r.textContent=t},ready:()=>{r.textContent=`Ready.`,i.classList.remove(`hidden`)},error:e=>{r.textContent=e,r.style.color=`var(--danger)`}}}showMenu(){this.inGame=!1,this.hud.classList.add(`hidden`),this.chatEl.classList.add(`hidden`),this.closeModal(),Q(`#menu`)?.remove();let e=Ly(`<div id="menu" class="screen interactive"><div class="col">
      <div class="logo">OPEN<br>BACKROOMS<small>NOCLIP INTO THE YELLOW</small></div>
      <div class="menu-list">
        <button class="mbtn" data-a="solo">Play Solo</button>
        <button class="mbtn" data-a="ai">Play with AI<small>companions</small></button>
        <button class="mbtn" data-a="online">Online<small>public worlds &amp; custom rooms</small></button>
        <button class="mbtn" data-a="settings">Settings</button>
        <button class="mbtn" data-a="how">How to Play</button>
      </div>
      <div class="profile-strip">
        <span>NAME <input class="name" maxlength="20" value="${Ry(J.name)}"></span>
        <span class="coin">${Y.coins} BC</span>
        <span>ESCAPES ${Y.escapes}</span>
      </div>
      <div class="foot">Free &amp; open source. Backrooms Coins (BC) are earned in-game only — no real money, ever.</div>
    </div></div>`);this.root.prepend(e);let t=Q(`.name`,e);t.addEventListener(`change`,()=>{let e=Ov(t.value,20);J.name=Ev(e)||!e?J.name:e,t.value=J.name,zu()}),t.addEventListener(`keydown`,e=>e.stopPropagation()),e.querySelectorAll(`.mbtn`).forEach(e=>{e.onmouseenter=()=>this.game.audio.play(`ui_hover`,{bus:`ui`,gain:.5}),e.onclick=()=>{this.game.audio.play(`ui_click`,{bus:`ui`});let t=e.dataset.a;t===`solo`?this.pickMode(`PLAY SOLO`,(e,t)=>this.actions.solo(e,t)):t===`ai`?this.pickMode(`PLAY WITH AI`,(e,t)=>this.actions.ai(e,t)):t===`online`?this.openOnline():t===`settings`?this.openSettings():t===`how`&&this.openHow()}})}hideMenu(){Q(`#menu`)?.remove()}enterGame(e){this.inGame=!0,this.online=e,this.hideMenu(),this.closeModal(),this.hud.classList.remove(`hidden`),this.chatEl.classList.toggle(`hidden`,!e||!J.chat),this.refreshCoins()}status(e){let t=Q(`.status`,this.modal??document.body);t&&(t.textContent=e)}openModal(e){this.closeModal();let t=Ly(`<div class="modal-wrap interactive"><div class="panel">${e}<button class="close">ESC ✕</button></div></div>`);return this.root.append(t),Q(`.close`,t).onclick=()=>this.closeModal(!0),t.addEventListener(`mousedown`,e=>{e.target===t&&this.closeModal(!0)}),t.querySelectorAll(`input,textarea,select`).forEach(e=>e.addEventListener(`keydown`,e=>e.key!==`Escape`&&e.stopPropagation())),this.modal=t,this.game.input.unlock(),t}closeModal(e=!1){this.modal?.remove(),this.modal=null,e&&this.inGame&&this.resume()}get modalOpen(){return!!this.modal}resume(){this.game.paused=!1,this.game.input.lock()}modeFields(e=``){return`<div class="field"><label>Mode</label><div class="choice ${e}mode">
        <button data-m="escape" class="on"><b>Escape run</b><small>Level 0 → Level 1 → Level 2 → ???. Find each level's way out.</small></button>
        <button data-m="endless"><b>Endless</b><small>One level, no way out. Survive as long as you can; coins keep coming.</small></button>
      </div></div>
      <div class="field ${e}lvl hidden"><label>Level</label><div class="choice">${id.map((e,t)=>`<button data-l="${t}" class="${t===0?`on`:``}"><b>Level ${t}</b><small>${e.subtitle}</small></button>`).join(``)}</div></div>`}wireMode(e,t=``){let n=`escape`,r=0;return e.querySelectorAll(`.${t}mode button`).forEach(r=>{r.onclick=()=>{n=r.dataset.m,e.querySelectorAll(`.${t}mode button`).forEach(e=>e.classList.toggle(`on`,e===r)),Q(`.${t}lvl`,e).classList.toggle(`hidden`,n!==`endless`)}}),e.querySelectorAll(`.${t}lvl button`).forEach(n=>{n.onclick=()=>{r=Number(n.dataset.l),e.querySelectorAll(`.${t}lvl button`).forEach(e=>e.classList.toggle(`on`,e===n))}}),()=>({mode:n,level:n===`endless`?r:0})}pickMode(e,t){let n=this.openModal(`<h2>${e}</h2><div class="sub">How do you want to play?</div>${this.modeFields()}<button class="btn primary go">START</button>`),r=this.wireMode(n);Q(`.go`,n).onclick=()=>{let{mode:e,level:n}=r();this.closeModal(),t(e,n)}}openOnline(){let e=this.openModal(`<h2>ONLINE</h2><div class="sub">Peer-to-peer, free, no accounts. Your connection goes straight to other players.</div>
      <div class="tabs"><button class="tab on" data-t="browse">Browse Games</button><button class="tab" data-t="public">Quick Join</button><button class="tab" data-t="create">Host</button><button class="tab" data-t="join">Invite Link</button></div>
      <div data-p="browse">
        <div class="row filter"><button class="chip on" data-f="mine">My region (${My[this.region]})</button><button class="chip" data-f="all">Whole world</button><span class="sub count" style="margin:0 0 0 auto"></span></div>
        <div class="list games"></div>
        <div class="pw hidden field" style="margin-top:12px"><label class="pwl">Password</label><div class="linkbox"><input type="password" class="pwin" maxlength="40"><button class="btn primary pwgo">JOIN</button></div></div>
      </div>
      <div data-p="public" class="hidden">
        <div class="field"><label>Region (auto-detected)</label></div>
        <div class="region-pick">${Object.keys(My).map(e=>`<button data-r="${e}" class="${e===this.region?`on`:``}">${My[e]}</button>`).join(``)}</div>
        <p class="sub">Drops you into the busiest public world in that region with a free slot (up to 8 players). Public worlds are escape runs.</p>
        <button class="btn primary go-public">QUICK JOIN</button>
      </div>
      <div data-p="create" class="hidden">
        <div class="field"><label>Room name <span class="count avail"></span></label><div class="urlbox"><span>${Ry(Dy())}?room=</span><input type="text" class="rname" maxlength="32" placeholder="level-zero-crew" spellcheck="false"></div></div>
        <div class="field"><label>Password (optional: players will be asked for it)</label><input type="password" class="rpass" maxlength="40"></div>
        ${this.modeFields(`h`)}
        <p class="sub">That's your invite link. Room names are unique: if someone is already hosting one with that name, pick another. Your room is listed in Browse Games, and as host you can remove players from the pause menu.</p>
        <button class="btn primary go-create">HOST &amp; ENTER</button>
      </div>
      <div data-p="join" class="hidden">
        <div class="field"><label>Invite link</label><div class="urlbox"><span>${Ry(Dy())}?room=</span><input type="text" class="jname" maxlength="300" placeholder="room-name" spellcheck="false"></div></div>
        <p class="sub">Type the room name, or paste the whole link a friend sent you.</p>
        <div class="field"><label>Password (if any)</label><input type="password" class="jpass" maxlength="40"></div>
        <button class="btn primary go-join">JOIN</button>
      </div>
      <div class="status" style="margin-top:14px"></div>`);e.querySelectorAll(`.tab`).forEach(t=>{t.onclick=()=>{e.querySelectorAll(`.tab`).forEach(e=>e.classList.toggle(`on`,e===t)),e.querySelectorAll(`[data-p]`).forEach(e=>e.classList.toggle(`hidden`,e.dataset.p!==t.dataset.t))}}),e.querySelectorAll(`.region-pick button`).forEach(t=>{t.onclick=()=>{this.region=t.dataset.r,e.querySelectorAll(`.region-pick button`).forEach(e=>e.classList.toggle(`on`,e===t))}});let t=!1,n=null,r=()=>{if(!e.isConnected)return;let r=Ay.list(t?void 0:this.region);Q(`.count`,e).textContent=`${r.length} game${r.length===1?``:`s`}`,Q(`.games`,e).innerHTML=r.length?r.map(e=>`<div class="item game"><span><b>${e.locked?`🔒 `:``}${Ry(e.name)}</b><small>${My[e.region]} · ${e.mode===`endless`?`Endless · Level ${e.level}`:`Escape run · on Level ${e.level}`}</small></span>
                <span class="row" style="gap:10px"><span class="ping">${e.players}/${e.max}</span><button class="btn join" data-id="${Ry(e.id)}" ${e.players>=e.max?`disabled`:``}>${e.players>=e.max?`FULL`:`JOIN`}</button></span></div>`).join(``):`<p class="sub">Listening for games${t?` worldwide`:` in ${My[this.region]}`}… hosts announce every 15 seconds. You can also Quick Join or Host one.</p>`,e.querySelectorAll(`.join`).forEach(t=>{t.onclick=()=>{let r=Ay.listings.get(t.dataset.id??``);if(r){if(!r.locked)return this.actions.joinRoom(r.id,``);n=r,Q(`.pwl`,e).textContent=`Password for "${r.name}"`,Q(`.pw`,e).classList.remove(`hidden`),Q(`.pwin`,e).focus()}}})};Ay.browse(),Ay.onChange=r;let i=setInterval(()=>e.isConnected?r():clearInterval(i),3e3);r(),e.querySelectorAll(`.chip`).forEach(n=>{n.onclick=()=>{t=n.dataset.f===`all`,e.querySelectorAll(`.chip`).forEach(e=>e.classList.toggle(`on`,e===n)),r()}});let a=()=>{let t=Q(`.pwin`,e).value;if(!n||!t)return this.status(`Enter the password.`);this.actions.joinRoom(n.id,t)};Q(`.pwgo`,e).onclick=a,Q(`.pwin`,e).addEventListener(`keydown`,e=>e.key===`Enter`&&a());let o=Oy,s=Q(`.rname`,e),c=Q(`.avail`,e);s.oninput=()=>{let e=o(s.value),t=Ay.byName(e).every(e=>e.host===yv.pubkey);c.textContent=e?t?`${e} · looks free`:`${e} · taken`:``,c.style.color=e?t?`var(--ok)`:`var(--danger)`:``};let l=Q(`.jname`,e);l.addEventListener(`paste`,()=>setTimeout(()=>{try{let e=new URL(l.value.trim()),t=e.searchParams.get(`room`);t&&(l.value=t+(e.hash?e.hash:``))}catch{}}));let u=this.wireMode(e,`h`);Q(`.go-public`,e).onclick=()=>this.actions.publicWorld(this.region),Q(`.go-create`,e).onclick=()=>{let t=o(Q(`.rname`,e).value);if(!t)return this.status(`Pick a room name.`);if(Ev(t))return this.status(`Choose a different room name.`);let{mode:n,level:r}=u();this.actions.createRoom(t,Q(`.rpass`,e).value,n,r)},Q(`.go-join`,e).onclick=()=>{let t=l.value.trim(),n=Q(`.jpass`,e).value;try{let e=new URL(t.includes(`://`)?t:Dy()+`?room=`+t);t=e.searchParams.get(`room`)??t;let r=new URLSearchParams(e.hash.slice(1)).get(`k`);r&&!n&&(n=r)}catch{}if(!t)return this.status(`Paste an invite link.`);this.actions.joinRoom(t,n)}}openHow(){this.openModal(`<h2>HOW TO PLAY</h2><div class="sub">If you're not careful and you noclip out of reality in the wrong areas, you'll end up in the Backrooms.</div>
      <div class="list">
        <div class="item"><span><span class="kbd">WASD</span>Move</span><span><span class="kbd">SHIFT</span>Sprint (loud)</span></div>
        <div class="item"><span><span class="kbd">C</span>Crouch (quiet)</span><span><span class="kbd">SPACE</span>Jump</span></div>
        <div class="item"><span><span class="kbd">F</span>Flashlight</span><span><span class="kbd">E</span>Interact</span></div>
        <div class="item"><span><span class="kbd">Q</span>Drink Almond Water</span><span><span class="kbd">R</span>Swap battery</span></div>
        <div class="item"><span><span class="kbd">T</span>Chat (online)</span><span><span class="kbd">V</span>Push-to-talk (online)</span></div>
        <div class="item"><span><span class="kbd">TAB</span>Players</span><span><span class="kbd">ESC</span>Pause</span></div>
      </div>
      <p class="sub" style="margin-top:16px">You start at the <b>Base</b>, a safe zone with a supply kiosk, lockers and a bulletin board. Leave it to explore. Follow the scrawled arrows to find the exit of each level. Level 0 → Level 1 → Level 2 → ???</p>
      <p class="sub">Entities: some hunt by <b>sound</b> (walk or crouch), one only moves when <b>nobody is looking</b>, and some things in the dark hate <b>light</b>. Sanity drains in darkness. Almond Water helps.</p>
      <p class="sub">You earn Backrooms Coins by exploring, surviving, finding Almond Water and escaping. Spend them at the kiosk or on bulletin notes. There is no way to buy coins with money.</p>`)}openSettings(){let e=this.openModal(`<h2>SETTINGS</h2>
      <div class="tabs"><button class="tab on" data-t="video">Video</button><button class="tab" data-t="audio">Audio</button><button class="tab" data-t="controls">Controls</button><button class="tab" data-t="social">Social</button></div>
      <div data-p="video">
        <div class="field"><label>Quality</label><select class="q">${[`auto`,`low`,`medium`,`high`,`ultra`].map(e=>`<option ${J.quality===e?`selected`:``}>${e}</option>`).join(``)}</select></div>
        ${this.slider(`fov`,`Field of view`,60,100,1)}
        ${this.slider(`vhs`,`Old tape look`,0,1,.05)}
        ${this.slider(`grain`,`Film grain`,0,1,.02)}
        ${this.slider(`motionBlur`,`Motion blur`,0,1.2,.05)}
        ${this.slider(`headBob`,`Head motion`,0,1.5,.05)}
        ${this.check(`showFps`,`Show FPS`)}
        ${this.check(`reduceFlashes`,`Reduce flashes and screen shake (jumpscares)`)}
      </div>
      <div data-p="audio" class="hidden">
        ${this.slider(`master`,`Master`,0,1,.05)}
        ${this.slider(`sfx`,`Effects`,0,1.5,.05)}
        ${this.slider(`ambience`,`Ambience`,0,1.5,.05)}
        ${this.slider(`voice`,`Voice chat`,0,2,.05)}
        <div class="field"><label>Microphone</label><select class="mic"><option value="ptt" ${J.micMode===`ptt`?`selected`:``}>Push-to-talk (V)</option><option value="open" ${J.micMode===`open`?`selected`:``}>Open mic</option><option value="off" ${J.micMode===`off`?`selected`:``}>Off</option></select></div>
      </div>
      <div data-p="controls" class="hidden">
        ${this.slider(`sensitivity`,`Mouse sensitivity`,.1,5,.05)}
        ${this.check(`invertY`,`Invert Y axis`)}
        ${this.check(`rawInput`,`Raw mouse input (ignore OS acceleration)`)}
        <p class="sub">Gamepads are supported (left stick move, right stick look, A interact, Y flashlight, LB sprint, B crouch).</p>
      </div>
      <div data-p="social" class="hidden">
        ${this.check(`chat`,`Show text chat (online)`)}
        ${this.check(`profanityFilter`,`Filter bad words in chat`)}
        <p class="sub">Chat goes directly to players in your room and isn't stored. Bulletin board notes are filtered and are public: they're shared through public Nostr relays until they expire.</p>
      </div>`);e.querySelectorAll(`.tab`).forEach(t=>{t.onclick=()=>{e.querySelectorAll(`.tab`).forEach(e=>e.classList.toggle(`on`,e===t)),e.querySelectorAll(`[data-p]`).forEach(e=>e.classList.toggle(`hidden`,e.dataset.p!==t.dataset.t))}}),e.querySelectorAll(`input[type=range]`).forEach(e=>{e.oninput=()=>{J[e.name]=parseFloat(e.value),e.nextElementSibling.value=e.value,zu(),this.actions.applySettings()}}),e.querySelectorAll(`input[type=checkbox]`).forEach(e=>{e.onchange=()=>{J[e.name]=e.checked,zu(),this.actions.applySettings(),this.chatEl.classList.toggle(`hidden`,!this.online||!J.chat||!this.inGame)}}),Q(`.q`,e).onchange=e=>{J.quality=e.target.value,zu(),this.game.setQuality()},Q(`.mic`,e).onchange=e=>{J.micMode=e.target.value,zu(),J.micMode!==`off`&&this.game.net?.enableMic(),this.game.net?.setTalking(!1)}}slider(e,t,n,r,i){let a=J[e];return`<div class="slider"><span>${t}</span><input type="range" name="${e}" min="${n}" max="${r}" step="${i}" value="${a}"><output>${a}</output></div>`}check(e,t){return`<label class="check"><input type="checkbox" name="${e}" ${J[e]?`checked`:``}>${t}</label>`}openPause(){let e=this.game.net,t=e?[...e.peers.values()]:[],n=this.openModal(`<div class="pause"><h2>PAUSED</h2><div class="sub">${id[this.game.level].name} — ${id[this.game.level].subtitle}${this.online?` · ${Ry(e?.label??``)}`:``}</div>
      ${this.onlineLink?`<div class="field"><label>Invite link</label><div class="linkbox"><input type="text" readonly value="${Ry(this.onlineLink)}"><button class="btn copy">COPY</button></div></div>`:``}
      ${this.online?`<div class="field"><label>Players (${t.length+1}/8)</label><div class="list players"><div class="item"><span>${Ry(J.name)} (you)</span><span class="ping">L${this.game.level}</span></div>${t.map(t=>`<div class="item"><span>${Ry(t.name)}${e?.hostPeer===t.id?` (host)`:``}</span><span class="row" style="gap:10px"><span class="ping">L${t.level} · ${Math.round(t.ping)}ms</span>${e?.isHost?`<button class="btn kick" data-id="${Ry(t.id)}">KICK</button>`:``}</span></div>`).join(``)}</div></div>`:``}
      <div class="pause-actions"><button class="btn primary resume">RESUME</button><button class="btn settings">SETTINGS</button><button class="btn how">CONTROLS</button><button class="btn leave">LEAVE TO MENU</button></div><div class="hint">ESC to resume</div></div>`);Q(`.resume`,n).onclick=()=>this.closeModal(!0),n.querySelectorAll(`.kick`).forEach(e=>{e.onclick=()=>{this.actions.kick(e.dataset.id??``),setTimeout(()=>this.openPause(),100)}}),Q(`.settings`,n).onclick=()=>this.openSettings(),Q(`.how`,n).onclick=()=>this.openHow(),Q(`.leave`,n).onclick=()=>this.actions.leave();let r=n.querySelector(`.copy`);r&&(r.onclick=()=>{navigator.clipboard?.writeText(this.onlineLink),r.textContent=`COPIED`}),this.game.paused=!0}openPanel(e){e===`shop`?this.openShop():e===`locker`?this.openLocker():this.openBoard()}openShop(){let e=()=>{let t=this.openModal(`<h2>SUPPLY KIOSK</h2><div class="sub">Balance: <b style="color:var(--accent)">${Y.coins} BC</b> — earned by exploring, surviving and escaping. No real money accepted (or possible).</div>
        <div class="grid">${zy.map(e=>{let t=e.kind!==`consumable`&&(Y.owned.includes(e.id)||e.id===`torch_pro`&&Y.flashlight===`torch_pro`),n=e.kind===`outfit`&&Y.outfit===e.id;return`<div class="card ${t?`owned`:``}"><h3>${e.name}</h3><p>${e.desc}</p>
            ${e.kind===`consumable`?`<p>You have: ${Y.inventory[e.id]??0}</p>`:``}
            <div class="row" style="justify-content:space-between"><span class="price">${t?n?`WEARING`:`OWNED`:e.price+` BC`}</span>
            ${t?e.kind===`outfit`&&!n?`<button class="btn" data-wear="${e.id}">WEAR</button>`:``:`<button class="btn primary" data-buy="${e.id}" ${Y.coins<e.price?`disabled`:``}>BUY</button>`}</div></div>`}).join(``)}</div>`);t.querySelectorAll(`[data-buy]`).forEach(t=>{t.onclick=()=>{let n=zy.find(e=>e.id===t.dataset.buy);Wu(n.price)&&(n.kind===`consumable`?Y.inventory[n.id]=(Y.inventory[n.id]??0)+1:n.kind===`upgrade`?(Y.owned.push(n.id),Y.flashlight=n.id):(Y.owned.push(n.id),Y.outfit=n.id),Bu(),this.game.audio.play(`ui_click`,{bus:`ui`,rate:1.3}),e())}}),t.querySelectorAll(`[data-wear]`).forEach(t=>{t.onclick=()=>{Y.outfit=t.dataset.wear,Bu(),e()}})};e()}openLocker(){let e=()=>{let t=[...new Set([...Object.keys(Y.inventory),...Object.keys(Y.locker)])].filter(e=>By[e]),n=this.openModal(`<h2>YOUR LOCKER</h2><div class="sub">Items in your locker stay safe when you die. Items you carry are lost if you're taken.</div>
        <div class="list">${t.map(e=>`<div class="item"><span>${By[e]}</span><span>Carrying <b>${Y.inventory[e]??0}</b> · Stored <b>${Y.locker[e]??0}</b></span>
          <span class="row"><button class="btn" data-store="${e}" ${(Y.inventory[e]??0)<1?`disabled`:``}>STORE →</button><button class="btn" data-take="${e}" ${(Y.locker[e]??0)<1?`disabled`:``}>← TAKE</button></span></div>`).join(``)||`<p class="sub">Empty. Buy supplies at the kiosk.</p>`}</div>
        <p class="sub" style="margin-top:14px">Outfits owned: ${Y.owned.filter(e=>dy[e]!==void 0).length} · Escapes: ${Y.escapes} · Deaths: ${Y.deaths} · Lifetime BC: ${Y.totalEarned}</p>`);n.querySelectorAll(`[data-store]`).forEach(t=>{t.onclick=()=>{let n=t.dataset.store;Y.inventory[n]--,Y.locker[n]=(Y.locker[n]??0)+1,Bu(),e()}}),n.querySelectorAll(`[data-take]`).forEach(t=>{t.onclick=()=>{let n=t.dataset.take;Y.locker[n]--,Y.inventory[n]=(Y.inventory[n]??0)+1,Bu(),e()}})};e()}openBoard(){let e=this.game.mode!==`ai`;e&&zv.connect();let{pinned:t,overflow:n}=zv.split(),r=Math.max(1,Math.ceil((Iv()-Date.now())/864e5)),i=(e,t)=>`<div class="post ${e.expires===1/0?`forever`:``}" style="--r:${t*37%5-2}deg">${Ry(e.text)}<div class="meta">${Ry(e.name)}${e.mine?` (you)`:``} · ${new Date(e.t).toLocaleDateString()} · ${e.expires===1/0?`permanent`:`until ${new Date(e.expires).toLocaleDateString()}`}</div></div>`,a=this.openModal(`<div class="board-panel"><h2>Bulletin Board</h2><div class="sub">${e?`One board for every player, everywhere. Clears in <b>${r} day${r===1?``:`s`}</b>. Pay more BC to keep a note up through resets.`:`AI mode has no bulletin board, chat or voice.`}</div>
      ${e?`<div class="section-label">On the board <span>${t.length} / 12</span></div>
      <div class="posts">${t.length?t.map(i).join(``):`<p class="sub">Nothing pinned yet (or still loading). Be the first to leave a warning.</p>`}</div>
      ${n.length?`<details class="overflow" ${zv.full?`open`:``}><summary class="section-label"><span class="lbl">The pile</span><span>${n.length} note${n.length===1?``:`s`} that didn't fit</span></summary><div class="posts">${n.map(i).join(``)}</div></details>`:``}
      ${zv.full?`<div class="notice"><b>Board full.</b> New notes won't be pinned on the board itself. They go to the pile, which everyone sees when they open the board.</div>`:``}
      <div class="field" style="margin-top:18px"><label>Your note <span class="count">0 / 160</span></label><textarea class="note" maxlength="160" placeholder="e.g. Arrows near the wet carpet LIE. Head for the red ones."></textarea></div>
      <div class="field"><label>How long it stays up</label><div class="choice tiers">${Pv.map((e,t)=>`<button data-i="${t}" class="${t===0?`on`:``}" ${Y.coins<e.price?`disabled`:``}><b>${e.price.toLocaleString()} BC</b><small>${e.name}</small></button>`).join(``)}</div></div>
      <div class="row"><button class="btn primary pin">${zv.full?`ADD TO PILE`:`PIN NOTE`}</button><span class="sub" style="margin:0">Balance ${Y.coins.toLocaleString()} BC</span><span class="status"></span></div>`:``}</div>`);zv.onChange=()=>{a.isConnected&&!Q(`.note`,a)?.value&&this.openBoard()};let o=Pv[0];a.querySelectorAll(`.tiers button`).forEach(e=>{e.onclick=()=>{o=Pv[Number(e.dataset.i)],a.querySelectorAll(`.tiers button`).forEach(t=>t.classList.toggle(`on`,t===e))}});let s=a.querySelector(`.note`);s&&(s.oninput=()=>Q(`.count`,a).textContent=`${s.value.length} / 160`);let c=a.querySelector(`.pin`);c&&s&&(c.onclick=()=>{let e=Ov(s.value,160);if(e.length<3)return this.status(`Write a little more.`);if(Ev(e))return this.status(`Please keep notes appropriate.`);if(!Wu(o.price))return this.status(`Not enough BC.`);let t=zv.full;zv.post(J.name||`Wanderer`,Dv(e),o),this.toast(t?`Board full: your note went on the pile.`:o.id===`month`?`Note pinned until the next reset.`:`Note pinned.`),s.value=``,setTimeout(()=>this.openBoard(),300)})}prompt(e,t){if(!e){this.promptEl.classList.add(`hidden`);return}let n=t===`pickup`?`Take`:t===`exit`?`Enter`:t===`couch`||t===`armchair`?`Sit on`:`Use`;this.promptEl.innerHTML=`<i>E</i> ${n} ${Ry(e)}`,this.promptEl.classList.remove(`hidden`)}toast(e,t=``){let n=Ly(`<div class="toast ${t}">${Ry(e)}</div>`);for(this.toastsEl.append(n),setTimeout(()=>n.remove(),4200);this.toastsEl.children.length>5;)this.toastsEl.firstElementChild?.remove()}chatMessage(e,t,n=!1){let r=Q(`.log`,this.chatEl),i=Ly(`<div class="msg ${n?`sys`:``}">${n?``:`<b>${Ry(e)}</b>`}${Ry(t)}</div>`);for(r.append(i);r.children.length>40;)r.firstElementChild?.remove();this.chatEl.classList.remove(`faded`),this.chatFadeT=8}openChat(){this.online&&J.chat&&(this.chatOpen=!0,this.chatInput.classList.remove(`hidden`),this.chatEl.classList.remove(`faded`),this.game.input.enabled=!1,setTimeout(()=>this.chatInput.focus(),0))}closeChat(){this.chatOpen=!1,this.chatInput.value=``,this.chatInput.classList.add(`hidden`),this.chatInput.blur(),this.game.input.enabled=!0,this.game.canvas.focus()}titleCard(e,t){let n=Q(`#title-card`,this.hud);n.innerHTML=`${Ry(e)}<small>${Ry(t)}</small>`,n.classList.add(`show`),this.titleT=4}deathEl=null;showDeath(e){let t=this.game,[n,r]={hound:[`HOUND`,`It heard you before you ever saw it.`],howler:[`THE HOWLER`,`You looked away.`],smiler:[`SMILER`,`You turned your light on it. It smiled back.`],skinstealer:[`SKIN-STEALER`,`That wasn't who you thought it was.`]}[e]??[`UNKNOWN`,`Something found you in the dark.`],i=Math.floor(t.lifeTime),a=`${Math.floor(i/60)}:${String(i%60).padStart(2,`0`)}`,o=id[t.level];this.deathEl?.remove();let s=Ly(`<div class="death-screen">
      <div class="ds-inner">
        <div class="ds-kicker">You were caught by</div>
        <div class="ds-name">${n}</div>
        <div class="ds-line">${Ry(r)}</div>
        <div class="ds-stats"><span>${Ry(o.name)} — ${Ry(o.subtitle)}</span><span>Survived ${a}</span><span>Walked ${Math.round(t.lifeDist)} m</span></div>
        <div class="ds-wake">${t.startLevel===0?`Waking up at the base`:`Waking up at the start of ${Ry(o.name)}`}<i>.</i><i>.</i><i>.</i></div>
      </div></div>`);this.root.append(s),this.deathEl=s}hideDeath(){let e=this.deathEl;e&&(this.deathEl=null,e.classList.add(`out`),setTimeout(()=>e.remove(),1400))}showEnding(){let e=this.openModal(`<div class="pause ending"><div class="ds-kicker">You found a way out</div><h2>Daylight?</h2>
      <div class="sub">The elevator opened onto a parking lot. Real sun. Real air. You blinked, and the hum came back.</div>
      <div class="ds-stats"><span>All three levels</span><span>+100 BC</span><span>Escapes ${Y.escapes}</span></div>
      <div class="pause-actions"><button class="btn primary again">NOCLIP AGAIN</button></div>
      <div class="hint">The Backrooms reshuffle every time you enter</div></div>`);Q(`.again`,e).onclick=()=>this.closeModal(!0)}refreshCoins(){Q(`.coins`,this.hud).textContent=`${Y.coins} BC`;let e=document.querySelector(`.profile-strip .coin`);e&&(e.textContent=`${Y.coins} BC`)}onKey(e){if(!this.inGame||this.chatOpen)return;let t=e.target;if(!t||t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`){if(e.code===`Escape`){this.modal&&this.closeModal(!0);return}this.modal||(e.code===`KeyT`||e.code===`Enter`?(e.preventDefault(),this.openChat()):e.code===`KeyV`&&!e.repeat&&this.online?J.micMode===`ptt`&&this.game.net?.enableMic().then(()=>this.game.net?.setTalking(!0)):e.code===`KeyQ`?this.game.drinkAlmond()?this.toast(`You drink the Almond Water. The walls stop breathing.`):this.toast(`No Almond Water. Buy some at the base kiosk.`):e.code===`KeyR`?(Y.inventory.battery??0)>0?(Y.inventory.battery--,Bu(),this.game.player.battery=1,this.game.audio.play(`ui_click`,{rate:.5}),this.toast(`Fresh batteries.`)):this.toast(`No spare batteries.`):e.code===`Tab`&&(e.preventDefault(),this.openPause()))}}ping(e,t,n){let r=Ly(`<div class="ping-mark ${t}"><i>${t===`threat`?`!`:t===`exit`?`⇧`:`+`}</i><span>${Ry(n)}<b></b></span></div>`);this.root.append(r),this.pings.push({el:r,pos:e.clone(),t:t===`exit`?9:4.5})}updatePings(e){let t=this.game.camera,n=innerWidth,r=innerHeight;this.pings=this.pings.filter(i=>{if(i.t-=e,i.t<=0||!this.inGame)return i.el.remove(),!1;let a=i.pos.clone().setY(1.3).project(t),o=a.z>1,s=(a.x*.5+.5)*n,c=(-a.y*.5+.5)*r;return o&&(s=n-s,c=r-40),s=Math.max(40,Math.min(n-40,s)),c=Math.max(40,Math.min(r-60,c)),i.el.style.transform=`translate(${s}px, ${c}px)`,i.el.style.opacity=String(Math.min(1,i.t)),Q(`b`,i.el).textContent=` ${Math.round(t.position.distanceTo(i.pos))} m`,!0})}update(e){let t=this.game;if(this.updatePings(e),!this.inGame)return;let n=t.player;Q(`.bat`,this.hud).classList.toggle(`hidden`,!n.flashlight),Q(`.bat .fill`,this.hud).style.width=`${Math.round(n.battery*100)}%`;let r=id[t.level];Q(`.level`,this.hud).textContent=`${r.name} · ${r.subtitle}`,Q(`.fps`,this.hud).textContent=J.showFps?`${Math.round(t.debug.fps)} FPS · ${t.debug.calls} DC`:``;let i=Q(`.stamina`,this.hud);i.style.opacity=n.stamina<.98?`1`:`0`,Q(`i`,i).style.width=`${n.stamina*100}%`,Q(`.inv`,this.hud).innerHTML=`<span><b>${Y.inventory.almond??0}</b> Almond Water <i>Q</i></span><span><b>${Y.inventory.battery??0}</b> Batteries <i>R</i></span>`,Q(`.talk`,this.hud).classList.toggle(`hidden`,!(t.net?.pttDown||J.micMode===`open`&&t.net?.micOn));let a=r.cell,o=t.level===0&&Math.abs(n.pos.x/a-.5)<2.5&&Math.abs(n.pos.z/a-.5)<2.5;Q(`.safe`,this.hud).classList.toggle(`hidden`,!o),this.titleT>0&&(this.titleT-=e,this.titleT<=0&&Q(`#title-card`,this.hud).classList.remove(`show`)),this.chatFadeT>0&&(this.chatFadeT-=e,this.chatFadeT<=0&&!this.chatOpen&&this.chatEl.classList.add(`faded`))}};if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)&&!(`ontouchend`in document&&innerWidth>1100)){let e=document.createElement(`div`);e.id=`mobile-warn`,e.innerHTML=`OPEN BACKROOMS needs a keyboard &amp; mouse.<br><br>Please visit on a PC, Mac or laptop.`,document.body.append(e)}var Hy=document.getElementById(`c`),$=new yy(Hy),Uy=new URLSearchParams(location.search),Wy=new URLSearchParams(location.hash.slice(1)),Gy=Uy.get(`room`),Ky=Wy.get(`k`)??``,qy=!1;async function Jy(e,t,n,r=`escape`,i=0){$.menuMode=!1,$.mode=e,$.runMode=r,$.startLevel=r===`endless`?i:0,e!==`ai`&&zv.connect(),$.entities.authority=!0,$.run=0,$.bots.enabled=!1;for(let e of $.bots.list)e.avatar.dispose();$.bots.list=[],e===`ai`&&$.bots.enable(2),$.roomSeed=Xu(t),Zy.enterGame(e===`online`),await $.enterLevel($.startLevel),Zy.titleCard($.startLevel===0?`THE BASE`:id[$.startLevel].name.toUpperCase(),r===`endless`?`${n} · Endless`:n),$.input.lock()}async function Yy(e){if(e=e.trim(),/^public:(NA|SA|EU|AF|AS|OC):\d{1,2}$/.test(e)||Ty(e))return e;let t=/^([a-z0-9_-]{1,32})~([0-9a-f]{16})$/.exec(e.toLowerCase());if(t)return`room:${t[1]}~${t[2]}`;let n=Oy(e.replace(/^room:/,``));return n?Ay.resolve(n,e=>Zy.status(`Looking for room "${n}"… ${e}s`)):null}var Xy=(e,t)=>`${Dy()}?room=${encodeURIComponent(Ty(e)?.name??e.replace(/^room:/,``))}${t?`#k=`+encodeURIComponent(t):``}`,Zy=new Vy($,{solo:async(e,t)=>{qy||=(qy=!0,Zy.onlineLink=``,await Jy(`solo`,`solo-`+Date.now(),`Solo · offline`,e,t),!1)},ai:async(e,t)=>{qy||=(qy=!0,Zy.onlineLink=``,await Jy(`ai`,`ai-`+Date.now(),`AI companions · offline`,e,t),!1)},publicWorld:async e=>{if(qy)return;qy=!0;let t=Qy();t.mode=`escape`,t.startLevel=0;let n=await t.joinPublic(e,e=>Zy.status(e));Zy.onlineLink=``,await Jy(`online`,n,t.label),Zy.toast(`Connected to ${t.label}. ${t.peers.size} other${t.peers.size===1?``:`s`} here.`),qy=!1},createRoom:async(e,t,n,r)=>{if(qy)return;if(qy=!0,await Ay.taken(e,yv.pubkey,t=>Zy.status(`Checking "${e}" is free… ${t}s`))){Zy.status(`"${e}" is already taken by another room. Pick a different name.`),qy=!1;return}let i=Qy();Zy.status(`Opening your room…`);let a=wy(e,yv.pubkey);i.mode=n,i.startLevel=n===`endless`?r:0,i.region=Zy.region,await i.join(a,e,t,!0),Zy.onlineLink=Xy(a,t),await Jy(`online`,a,`Room "${e}"`,n,r),Zy.toast(`Room open and listed in Browse Games. Press TAB to copy the invite link.`),qy=!1},joinRoom:async(e,t)=>{if(qy)return;qy=!0;let n=await Yy(e);if(!n){Zy.status(`No open room called "${Oy(e)}". Check the name, or the host may have closed it.`),qy=!1;return}let r=Qy();if(Zy.status(`Connecting…`),r.mode=`escape`,r.startLevel=0,await r.join(n,Ty(n)?.name??n,t)===0&&!n.startsWith(`public:`)){r.leave(),Zy.status(t?`Could not reach the host: wrong password, or the room has closed.`:`Could not reach the host. The room may have closed, or it needs a password.`),qy=!1;return}Zy.onlineLink=n.startsWith(`room:`)?Xy(n,t):``,await Jy(`online`,n,r.label.startsWith(`public:`)?r.label:`Room "${Ty(n)?.name??r.label}"`,r.mode,r.startLevel),qy=!1},kick:e=>void $.net?.kick(e),leave:async()=>{$.net?.leave(),$.net=null,Zy.onlineLink=``,$.bots.enabled=!1;for(let e of $.bots.list)e.avatar.dispose();$.bots.list=[],$.menuMode=!0,$.paused=!1,$.input.unlock(),$.mode=`solo`,$.roomSeed=Xu(`menu`),await $.enterLevel(0),Zy.showMenu()},applySettings:()=>{$.audio.applyVolumes(),$.post.s.vhs=J.vhs,$.post.s.grain=J.grain,$.post.s.blur=J.motionBlur,$.input.raw=J.rawInput}});$.ui=Zy,$.input.raw=J.rawInput;function Qy(){if(!$.net){let e=new Py($);e.onChat=(e,t,n)=>Zy.chatMessage(e,t,n),e.onRoomConfig=(t,n)=>{e.mode=t,e.startLevel=n},e.onKicked=()=>{Zy.actions.leave(),setTimeout(()=>Zy.toast(`You were removed from the room by the host.`),1500)},$.net=e}return $.net}$.events.onLevel=e=>{!$.menuMode&&e.id>0&&Zy.titleCard(e.name.toUpperCase(),e.subtitle)},$.events.onDeath=e=>Zy.showDeath(e),zv.onNew=e=>{Zy.inGame&&$.mode!==`ai`&&(Zy.toast(`New note on the bulletin board from ${e.name}.`),$.audio.play(`ui_click`,{bus:`ui`,rate:1.6}))},Hy.addEventListener(`click`,()=>{Zy.inGame&&!Zy.modalOpen&&($.audio.resume(),$.input.lock())}),$.input.onLockChange=e=>{!e&&Zy.inGame&&!Zy.modalOpen&&!qy&&Zy.openPause(),e&&($.paused=!1)};var $y=Zy.bootScreen(async()=>{if($.audio.resume(),Ay.browse(),Gy){$.menuMode=!0,await $.start(`solo`,`menu`,0),Zy.showMenu(),Zy.status(`Joining invite…`),await Zy.actions.joinRoom(Gy,Ky);return}$.menuMode=!0,await $.start(`solo`,`menu`,0),Zy.showMenu()});$.boot((e,t)=>$y.progress(e,t)).then(()=>$y.ready()).catch(e=>{console.error(e),$y.error(`This browser could not start WebGL2. Try Chrome, Edge, Firefox or Safari 16+.`)}),window.__game=$,window.__levels=id,window.__findPath=ry;