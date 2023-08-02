<template>
    <html>

    <head>
    </head>

    <body>
        <div class="flex flex-col justify-center items-center">
            <div
                class="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
                <div class="h-full w-full">
                    <div class="relative w-full">
                        <img :src="match.imgUrl" class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt="">
                        <button
                            class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                            <div
                                class="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24 30C30.6274 30 36 24.4694 36 17.6471V4H12V17.6471C12 24.4694 17.3726 30 24 30Z"
                                        fill="#ffffff" stroke="#9b9b9b" stroke-width="4" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21V11H4C4 17.6667 8 21 12 21Z"
                                        stroke="#9b9b9b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M36 21V11H44C44 17.6667 40 21 36 21Z"
                                        stroke="#9b9b9b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M24 32V36" stroke="#9b9b9b" stroke-width="4" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M15 42L18.69 36H29.0425L33 42H15Z" fill="#ffffff" stroke="#9b9b9b"
                                        stroke-width="4" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="mb-3 flex items-center justify-between px-1 md:items-start">
                        <div class="mb-2">
                            <!-- 敬爱信息 -->
                            <p class="text-lg font-bold text-navy-700"> {{ match.matchName }}</p>
                            <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">{{ JSON.stringify(match.matchDescription).slice(0,20) + "......" }}</p>
                            <p>
                            <div class="bottom">
                                <div v-show="match.state == '未开始'"> <el-tag type="success" class="mx-1" effect="dark"
                                        round>{{
                                            match.state
                                        }}</el-tag></div>
                                <div v-show="match.state == '已开始'"> <el-tag type="danger" class="mx-1" effect="dark"
                                        round>{{
                                            match.state
                                        }}</el-tag></div>
                                <div v-show="match.state == '已结束'"> <el-tag type="info" class="mx-1" effect="dark" round>{{
                                    match.state
                                }}</el-tag></div>
                            </div>
                            </p>
                        </div>
                        <!-- 用户头像组 -->
                        <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
                            <span
                                class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">+{{
                                    match.participationCount }}</span><span
                                class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                                <img class="h-full w-full rounded-full object-cover" :src="matchUserImgUrls[0]" alt="">
                            </span>
                            <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                                <img class="h-full w-full rounded-full object-cover" :src="matchUserImgUrls[1]" alt="">
                            </span>
                            <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                                <img class="h-full w-full rounded-full object-cover" :src="matchUserImgUrls[2]" alt="">
                            </span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between md:items-center lg:justify-between ">
                        <div class="flex">
                            <p class="!mb-0 text-sm font-bold text-brand-500">{{ match.startTime }}<span> 开始</span></p>
                        </div>
                        <button href="" @click="toMatchDetial(match)"
                            class="linear rounded-[20px] bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700">查看详情</button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    </html>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Match } from '@/lib/types'
import { matchStore } from '@/stores/matchStore';
import { useRouter } from 'vue-router';
import API from '@/plugins/axiosInstance';
const router = useRouter()
const props = defineProps(['match'])
const match: Match = props.match
const matchUserImgUrls = ref([])
const toMatchDetial = (match: any) => {
    matchStore().setCurrentChoice(match)
    router.push({ name: 'matchDetial', })
}


/**
 * 
 */
const getMatchUserImgUrl = () => {
    if(match.id){
        API({
        url: '/getMatchUserImgUrl/' + match.id,
        method: 'get'
    }).then((res) => {
        matchUserImgUrls.value = res.data.data
    })
    }

}
getMatchUserImgUrl()
</script>


<style>
@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap);
@import url(https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap);
@import url(https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap);

/*
! tailwindcss v3.1.8 | MIT License | https://tailwindcss.com
*/
*,
:after,
:before {
    border: 0 solid #e9ecef;
    box-sizing: border-box
}

:after,
:before {
    --tw-content: ""
}

html {
    -webkit-text-size-adjust: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    line-height: 1.5;
    tab-size: 4
}

body {
    line-height: inherit;
    margin: 0
}

hr {
    border-top-width: 1px;
    color: inherit;
    height: 0
}

abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: inherit
}

a {
    color: inherit;
    text-decoration: inherit
}

b,
strong {
    font-weight: bolder
}

code,
kbd,
pre,
samp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    font-size: 1em
}

small {
    font-size: 80%
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: initial
}

sub {
    bottom: -.25em
}

sup {
    top: -.5em
}

table {
    border-collapse: collapse;
    border-color: inherit;
    text-indent: 0
}

button,
input,
optgroup,
select,
textarea {
    color: inherit;
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0
}

button,
select {
    text-transform: none
}

[type=button],
[type=reset],
[type=submit],
button {
    -webkit-appearance: button;
    background-color: initial;
    background-image: none
}

:-moz-focusring {
    outline: auto
}

:-moz-ui-invalid {
    box-shadow: none
}

progress {
    vertical-align: initial
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    height: auto
}

[type=search] {
    -webkit-appearance: textfield;
    outline-offset: -2px
}

::-webkit-search-decoration {
    -webkit-appearance: none
}

::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
}

summary {
    display: list-item
}

blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
    margin: 0
}

fieldset {
    margin: 0
}

fieldset,
legend {
    padding: 0
}

menu,
ol,
ul {
    list-style: none;
    margin: 0;
    padding: 0
}

textarea {
    resize: vertical
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #a0aec0;
    opacity: 1
}

input::placeholder,
textarea::placeholder {
    color: #a0aec0;
    opacity: 1
}

[role=button],
button {
    cursor: pointer
}

:disabled {
    cursor: default
}

audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
    display: block;
    vertical-align: middle
}

img,
video {
    height: auto;
    max-width: 100%
}

html {
    -webkit-font-feature-settings: "kern" !important;
    font-feature-settings: "kern" !important;
    -webkit-font-smoothing: antialiased;
    font-family: DM Sans, sans-serif !important;
    letter-spacing: -.5px
}

*,
:after,
:before {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
}

::-webkit-backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
}

::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
}

.fixed {
    position: fixed
}

.absolute {
    position: absolute
}

.relative {
    position: relative
}

.sticky {
    position: -webkit-sticky;
    position: sticky
}

.top-8 {
    top: 2rem
}

.top-11 {
    top: 2.75rem
}

.right-0 {
    right: 0
}

.top-3 {
    top: .75rem
}

.right-3 {
    right: .75rem
}

.bottom-\[30px\] {
    bottom: 30px
}

.right-\[35px\] {
    right: 35px
}

.top-4 {
    top: 1rem
}

.top-6 {
    top: 1.5rem
}

.-left-\[230px\] {
    left: -230px
}

.-left-\[250px\] {
    left: -250px
}

.-left-\[180px\] {
    left: -180px
}

.right-4 {
    right: 1rem
}

.top-px {
    top: 1px
}

.-top-12 {
    top: -3rem
}

.-bottom-12 {
    bottom: -3rem
}

.z-50 {
    z-index: 50
}

.z-0 {
    z-index: 0
}

.z-10 {
    z-index: 10
}

.\!z-\[99\] {
    z-index: 99 !important
}

.z-\[5\] {
    z-index: 5
}

.z-40 {
    z-index: 40
}

.\!z-50 {
    z-index: 50 !important
}

.z-20 {
    z-index: 20
}

.z-\[1\] {
    z-index: 1
}

.col-span-1 {
    grid-column: span 1/span 1
}

.col-span-4 {
    grid-column: span 4/span 4
}

.col-span-3 {
    grid-column: span 3/span 3
}

.col-span-5 {
    grid-column: span 5/span 5
}

.float-right {
    float: right
}

.mx-auto {
    margin-left: auto;
    margin-right: auto
}

.mx-3 {
    margin-left: .75rem;
    margin-right: .75rem
}

.my-\[12px\] {
    margin-bottom: 12px;
    margin-top: 12px
}

.mx-1 {
    margin-left: .25rem;
    margin-right: .25rem
}

.mx-\[56px\] {
    margin-left: 56px;
    margin-right: 56px
}

.mx-\[12px\] {
    margin-left: 12px;
    margin-right: 12px
}

.my-\[3px\] {
    margin-bottom: 3px;
    margin-top: 3px
}

.mx-2 {
    margin-left: .5rem;
    margin-right: .5rem
}

.ml-1 {
    margin-left: .25rem
}

.mt-2 {
    margin-top: .5rem
}

.mb-3 {
    margin-bottom: .75rem
}

.mb-2 {
    margin-bottom: .5rem
}

.mt-1 {
    margin-top: .25rem
}

.ml-px {
    margin-left: 1px
}

.-mr-3 {
    margin-right: -.75rem
}

.ml-1\.5 {
    margin-left: .375rem
}

.ml-3 {
    margin-left: .75rem
}

.mb-4 {
    margin-bottom: 1rem
}

.mb-6 {
    margin-bottom: 1.5rem
}

.mr-12 {
    margin-right: 3rem
}

.mt-\[3px\] {
    margin-top: 3px
}

.mb-1 {
    margin-bottom: .25rem
}

.mt-3 {
    margin-top: .75rem
}

.ml-\[6px\] {
    margin-left: 6px
}

.ml-2 {
    margin-left: .5rem
}

.ml-4 {
    margin-left: 1rem
}

.mt-\[50px\] {
    margin-top: 50px
}

.mt-\[58px\] {
    margin-top: 58px
}

.mb-7 {
    margin-bottom: 1.75rem
}

.mb-auto {
    margin-bottom: auto
}

.ml-\[18px\] {
    margin-left: 18px
}

.mt-0 {
    margin-top: 0
}

.mt-16 {
    margin-top: 4rem
}

.mb-16 {
    margin-bottom: 4rem
}

.mt-\[10vh\] {
    margin-top: 10vh
}

.mb-2\.5 {
    margin-bottom: .625rem
}

.mb-9 {
    margin-bottom: 2.25rem
}

.mt-4 {
    margin-top: 1rem
}

.mt-14 {
    margin-top: 3.5rem
}

.mt-7 {
    margin-top: 1.75rem
}

.mt-5 {
    margin-top: 1.25rem
}

.mb-5 {
    margin-bottom: 1.25rem
}

.mt-8 {
    margin-top: 2rem
}

.mr-2 {
    margin-right: .5rem
}

.mt-px {
    margin-top: 1px
}

.mt-\[20px\] {
    margin-top: 20px
}

.mb-\[14px\] {
    margin-bottom: 14px
}

.mb-\[40px\] {
    margin-bottom: 40px
}

.mt-\[36px\] {
    margin-top: 36px
}

.mt-6 {
    margin-top: 1.5rem
}

.mb-8 {
    margin-bottom: 2rem
}

.mr-4 {
    margin-right: 1rem
}

.ml-auto {
    margin-left: auto
}

.mb-px {
    margin-bottom: 1px
}

.mr-\[10px\] {
    margin-right: 10px
}

.block {
    display: block
}

.flex {
    display: flex
}

.inline-flex {
    display: inline-flex
}

.table {
    display: table
}

.grid {
    display: grid
}

.hidden {
    display: none
}

.aspect-video {
    aspect-ratio: 16/9
}

.h-6 {
    height: 1.5rem
}

.h-full {
    height: 100%
}

.h-8 {
    height: 2rem
}

.h-\[20px\] {
    height: 20px
}

.h-12 {
    height: 3rem
}

.h-\[60px\] {
    height: 60px
}

.h-4 {
    height: 1rem
}

.h-5 {
    height: 1.25rem
}

.h-\[61px\] {
    height: 61px
}

.h-10 {
    height: 2.5rem
}

.h-48 {
    height: 12rem
}

.h-px {
    height: 1px
}

.h-2 {
    height: .5rem
}

.h-2\.5 {
    height: .625rem
}

.h-\[90px\] {
    height: 90px
}

.h-fit {
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content
}

.h-\[50px\] {
    height: 50px
}

.h-9 {
    height: 2.25rem
}

.h-24 {
    height: 6rem
}

.h-7 {
    height: 1.75rem
}

.h-\[300px\] {
    height: 300px
}

.h-\[220px\] {
    height: 220px
}

.h-11 {
    height: 2.75rem
}

.h-\[250px\] {
    height: 250px
}

.h-16 {
    height: 4rem
}

.h-\[600px\] {
    height: 600px
}

.h-\[30px\] {
    height: 30px
}

.h-32 {
    height: 8rem
}

.h-\[87px\] {
    height: 87px
}

.h-\[83px\] {
    height: 83px
}

.h-3 {
    height: .75rem
}

.h-max {
    height: -webkit-max-content;
    height: max-content
}

.min-h-\[20px\] {
    min-height: 20px
}

.min-h-full {
    min-height: 100%
}

.min-h-\[84vh\] {
    min-height: 84vh
}

.min-h-screen {
    min-height: 100vh
}

.w-6 {
    width: 1.5rem
}

.w-full {
    width: 100%
}

.w-max {
    width: -webkit-max-content;
    width: max-content
}

.w-8 {
    width: 2rem
}

.w-\[20px\] {
    width: 20px
}

.w-\[60px\] {
    width: 60px
}

.w-4 {
    width: 1rem
}

.w-5 {
    width: 1.25rem
}

.w-\[224px\] {
    width: 224px
}

.w-\[355px\] {
    width: 355px
}

.w-\[360px\] {
    width: 360px
}

.w-\[85px\] {
    width: 85px
}

.w-\[350px\] {
    width: 350px
}

.w-10 {
    width: 2.5rem
}

.w-56 {
    width: 14rem
}

.w-auto {
    width: auto
}

.w-fit {
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content
}

.w-1 {
    width: .25rem
}

.w-\[256px\] {
    width: 256px
}

.w-24 {
    width: 6rem
}

.w-7 {
    width: 1.75rem
}

.w-\[108px\] {
    width: 108px
}

.w-2 {
    width: .5rem
}

.w-px {
    width: 1px
}

.w-9 {
    width: 2.25rem
}

.w-16 {
    width: 4rem
}

.w-\[30px\] {
    width: 30px
}

.w-\[87px\] {
    width: 87px
}

.w-\[83px\] {
    width: 83px
}

.w-1\/2 {
    width: 50%
}

.w-\[68px\] {
    width: 68px
}

.min-w-\[20px\] {
    min-width: 20px
}

.min-w-\[500px\] {
    min-width: 500px
}

.max-w-\[80\%\] {
    max-width: 80%
}

.max-w-screen-sm {
    max-width: 576px
}

.max-w-full {
    max-width: 100%
}

.flex-none {
    flex: none
}

.shrink {
    flex-shrink: 1
}

.flex-grow {
    flex-grow: 1
}

.origin-top-right {
    -webkit-transform-origin: top right;
    transform-origin: top right
}

.origin-\[65\%_0\%\] {
    -webkit-transform-origin: 65% 0;
    transform-origin: 65% 0
}

.origin-\[75\%_0\%\] {
    -webkit-transform-origin: 75% 0;
    transform-origin: 75% 0
}

.translate-x-0 {
    --tw-translate-x: 0px
}

.-translate-x-96,
.translate-x-0 {
    -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.-translate-x-96 {
    --tw-translate-x: -24rem
}

.scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1
}

.scale-0,
.scale-100 {
    -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0
}

.cursor-pointer {
    cursor: pointer
}

.resize {
    resize: both
}

.appearance-none {
    -webkit-appearance: none;
    appearance: none
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr))
}

.grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr))
}

.flex-row {
    flex-direction: row
}

.\!flex-row {
    flex-direction: row !important
}

.flex-row-reverse {
    flex-direction: row-reverse
}

.flex-col {
    flex-direction: column
}

.flex-wrap {
    flex-wrap: wrap
}

.items-start {
    align-items: flex-start
}

.items-end {
    align-items: flex-end
}

.items-center {
    align-items: center
}

.justify-start {
    justify-content: flex-start
}

.justify-center {
    justify-content: center
}

.justify-between {
    justify-content: space-between
}

.\!justify-between {
    justify-content: space-between !important
}

.justify-around {
    justify-content: space-around
}

.gap-2 {
    gap: .5rem
}

.gap-3 {
    gap: .75rem
}

.gap-5 {
    gap: 1.25rem
}

.gap-4 {
    gap: 1rem
}

.overflow-hidden {
    overflow: hidden
}

.overflow-x-scroll {
    overflow-x: scroll
}

.rounded-lg {
    border-radius: .5rem
}

.rounded-xl {
    border-radius: .75rem
}

.rounded-full {
    border-radius: 9999px
}

.rounded-\[20px\] {
    border-radius: 20px
}

.rounded-md {
    border-radius: .375rem
}

.rounded-2xl {
    border-radius: 1rem
}

.rounded-3xl {
    border-radius: 1.5rem
}

.rounded-t-3xl {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem
}

.rounded-t-2xl {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem
}

.border-2 {
    border-width: 2px
}

.border {
    border-width: 1px
}

.border-\[4px\] {
    border-width: 4px
}

.border-\[2px\] {
    border-width: 2px
}

.border-b {
    border-bottom-width: 1px
}

.border-dashed {
    border-style: dashed
}

.\!border-none {
    border-style: none !important
}

.border-white {
    --tw-border-opacity: 1;
    border-color: rgb(255 255 255/var(--tw-border-opacity))
}

.border-gray-300 {
    --tw-border-opacity: 1;
    border-color: rgb(203 213 224/var(--tw-border-opacity))
}

.border-red-500 {
    --tw-border-opacity: 1;
    border-color: rgb(245 57 57/var(--tw-border-opacity))
}

.border-green-500 {
    --tw-border-opacity: 1;
    border-color: rgb(34 197 94/var(--tw-border-opacity))
}

.border-gray-200 {
    --tw-border-opacity: 1;
    border-color: rgb(233 236 239/var(--tw-border-opacity))
}

.\!border-red-500 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(245 57 57/var(--tw-border-opacity)) !important
}

.\!border-green-500 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(34 197 94/var(--tw-border-opacity)) !important
}

.border-\[\#6a53ff\] {
    --tw-border-opacity: 1;
    border-color: rgb(106 83 255/var(--tw-border-opacity))
}

.\!border-gray-300 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(203 213 224/var(--tw-border-opacity)) !important
}

.bg-lightPrimary {
    --tw-bg-opacity: 1;
    background-color: rgb(244 247 254/var(--tw-bg-opacity))
}

.bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255/var(--tw-bg-opacity))
}

.bg-\[\#E0E5F2\] {
    --tw-bg-opacity: 1;
    background-color: rgb(224 229 242/var(--tw-bg-opacity))
}

.bg-brand-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(17 4 122/var(--tw-bg-opacity))
}

.bg-white\/0 {
    background-color: hsla(0, 0%, 100%, 0)
}

.\!bg-gray-100 {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(237 242 247/var(--tw-bg-opacity)) !important
}

.bg-white\/10 {
    background-color: hsla(0, 0%, 100%, .1)
}

.bg-brand-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(66 42 251/var(--tw-bg-opacity))
}

.bg-gray-200 {
    --tw-bg-opacity: 1;
    background-color: rgb(233 236 239/var(--tw-bg-opacity))
}

.bg-red-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(245 57 57/var(--tw-bg-opacity))
}

.bg-blue-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(59 130 246/var(--tw-bg-opacity))
}

.bg-green-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(34 197 94/var(--tw-bg-opacity))
}

.bg-yellow-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(234 179 8/var(--tw-bg-opacity))
}

.bg-orange-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(249 115 22/var(--tw-bg-opacity))
}

.bg-teal-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(20 184 166/var(--tw-bg-opacity))
}

.bg-navy-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(27 59 187/var(--tw-bg-opacity))
}

.bg-lime-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(130 214 22/var(--tw-bg-opacity))
}

.bg-cyan-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(23 193 232/var(--tw-bg-opacity))
}

.bg-pink-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(255 0 128/var(--tw-bg-opacity))
}

.bg-purple-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(168 85 247/var(--tw-bg-opacity))
}

.bg-amber-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(245 158 11/var(--tw-bg-opacity))
}

.bg-indigo-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(99 102 241/var(--tw-bg-opacity))
}

.bg-gray-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(173 181 189/var(--tw-bg-opacity))
}

.bg-gray-300 {
    --tw-bg-opacity: 1;
    background-color: rgb(203 213 224/var(--tw-bg-opacity))
}

.bg-\[\#e0e5f2\] {
    --tw-bg-opacity: 1;
    background-color: rgb(224 229 242/var(--tw-bg-opacity))
}

.\!bg-white {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(255 255 255/var(--tw-bg-opacity)) !important
}

.bg-\[\#6AD2FF\] {
    --tw-bg-opacity: 1;
    background-color: rgb(106 210 255/var(--tw-bg-opacity))
}

.bg-indigo-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(224 231 255/var(--tw-bg-opacity))
}

.bg-pink-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(244 114 182/var(--tw-bg-opacity))
}

.bg-none {
    background-image: none
}

.bg-gradient-to-br {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops))
}

.bg-gradient-to-b {
    background-image: linear-gradient(to bottom, var(--tw-gradient-stops))
}

.from-\[\#868CFF\],
.from-brandLinear {
    --tw-gradient-from: #868cff;
    --tw-gradient-to: rgba(134, 140, 255, 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-white\/50 {
    --tw-gradient-from: hsla(0, 0%, 100%, .5);
    --tw-gradient-to: hsla(0, 0%, 100%, 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.via-\[\#432CF3\] {
    --tw-gradient-to: rgba(67, 44, 243, 0);
    --tw-gradient-stops: var(--tw-gradient-from), #432cf3, var(--tw-gradient-to)
}

.to-blueSecondary {
    --tw-gradient-to: #4318ff
}

.to-brand-500 {
    --tw-gradient-to: #422afb
}

.to-white\/10 {
    --tw-gradient-to: hsla(0, 0%, 100%, .1)
}

.bg-cover {
    background-size: cover
}

.bg-clip-border {
    background-clip: initial
}

.bg-center {
    background-position: 50%
}

.bg-no-repeat {
    background-repeat: no-repeat
}

.object-cover {
    object-fit: cover
}

.p-2 {
    padding: .5rem
}

.\!p-4 {
    padding: 1rem !important
}

.p-3 {
    padding: .75rem
}

.p-0 {
    padding: 0
}

.p-4 {
    padding: 1rem
}

.p-\[20px\] {
    padding: 20px
}

.\!p-\[20px\] {
    padding: 20px !important
}

.p-\[16px\] {
    padding: 16px
}

.p-\[26px\] {
    padding: 26px
}

.px-3 {
    padding-left: .75rem;
    padding-right: .75rem
}

.py-3 {
    padding-bottom: .75rem;
    padding-top: .75rem
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem
}

.px-1 {
    padding-left: .25rem;
    padding-right: .25rem
}

.py-2 {
    padding-bottom: .5rem;
    padding-top: .5rem
}

.px-\[20px\] {
    padding-left: 20px;
    padding-right: 20px
}

.px-2 {
    padding-left: .5rem;
    padding-right: .5rem
}

.py-4 {
    padding-bottom: 1rem;
    padding-top: 1rem
}

.py-\[11px\] {
    padding-bottom: 11px;
    padding-top: 11px
}

.py-\[12px\] {
    padding-bottom: 12px;
    padding-top: 12px
}

.px-8 {
    padding-left: 2rem;
    padding-right: 2rem
}

.px-11 {
    padding-left: 2.75rem;
    padding-right: 2.75rem
}

.px-\[26px\] {
    padding-left: 26px;
    padding-right: 26px
}

.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem
}

.py-6 {
    padding-bottom: 1.5rem;
    padding-top: 1.5rem
}

.px-\[30px\] {
    padding-left: 30px;
    padding-right: 30px
}

.py-\[30px\] {
    padding-bottom: 30px;
    padding-top: 30px
}

.py-\[20px\] {
    padding-bottom: 20px;
    padding-top: 20px
}

.px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem
}

.pt-1 {
    padding-top: .25rem
}

.pl-3 {
    padding-left: .75rem
}

.pt-3 {
    padding-top: .75rem
}

.pb-8 {
    padding-bottom: 2rem
}

.pb-4 {
    padding-bottom: 1rem
}

.pr-2 {
    padding-right: .5rem
}

.pb-10 {
    padding-bottom: 2.5rem
}

.pt-12 {
    padding-top: 3rem
}

.pl-5 {
    padding-left: 1.25rem
}

.pr-5 {
    padding-right: 1.25rem
}

.pt-4 {
    padding-top: 1rem
}

.pr-16 {
    padding-right: 4rem
}

.pb-\[10px\] {
    padding-bottom: 10px
}

.pt-\[14px\] {
    padding-top: 14px
}

.pb-\[16px\] {
    padding-bottom: 16px
}

.pb-6 {
    padding-bottom: 1.5rem
}

.pr-28 {
    padding-right: 7rem
}

.pb-\[18px\] {
    padding-bottom: 18px
}

.pb-7 {
    padding-bottom: 1.75rem
}

.pt-2 {
    padding-top: .5rem
}

.pt-10 {
    padding-top: 2.5rem
}

.pb-0 {
    padding-bottom: 0
}

.pb-\[20px\] {
    padding-bottom: 20px
}

.pb-2 {
    padding-bottom: .5rem
}

.pr-14 {
    padding-right: 3.5rem
}

.pr-10 {
    padding-right: 2.5rem
}

.pr-32 {
    padding-right: 8rem
}

.pb-3 {
    padding-bottom: .75rem
}

.text-left {
    text-align: left
}

.text-center {
    text-align: center
}

.text-start {
    text-align: start
}

.font-poppins {
    font-family: Poppins, sans-serif
}

.font-dm {
    font-family: DM Sans, sans-serif
}

.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem
}

.text-sm {
    font-size: .875rem;
    line-height: 1.25rem
}

.text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem
}

.text-xs {
    font-size: .75rem;
    line-height: 1rem
}

.text-base {
    font-size: 1rem;
    line-height: 1.5rem
}

.text-\[33px\] {
    font-size: 33px
}

.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem
}

.text-\[26px\] {
    font-size: 26px
}

.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem
}

.text-\[34px\] {
    font-size: 34px
}

.text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem
}

.text-5xl {
    font-size: 3rem;
    line-height: 1
}

.text-\[80px\] {
    font-size: 80px
}

.text-\[22px\] {
    font-size: 22px
}

.text-\[21px\] {
    font-size: 21px
}

.text-\[14px\] {
    font-size: 14px
}

.font-bold {
    font-weight: 700
}

.font-medium {
    font-weight: 500
}

.font-normal {
    font-weight: 400
}

.font-semibold {
    font-weight: 600
}

.uppercase {
    text-transform: uppercase
}

.capitalize {
    text-transform: capitalize
}

.leading-4 {
    line-height: 1rem
}

.leading-6 {
    line-height: 1.5rem
}

.leading-9 {
    line-height: 2.25rem
}

.tracking-wide {
    letter-spacing: .025em
}

.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
}

.text-brand-500 {
    --tw-text-opacity: 1;
    color: rgb(66 42 251/var(--tw-text-opacity))
}

.text-gray-600 {
    --tw-text-opacity: 1;
    color: rgb(163 174 208/var(--tw-text-opacity))
}

.text-navy-700 {
    --tw-text-opacity: 1;
    color: rgb(27 37 75/var(--tw-text-opacity))
}

.text-white\/0 {
    color: hsla(0, 0%, 100%, 0)
}

.text-red-500 {
    --tw-text-opacity: 1;
    color: rgb(245 57 57/var(--tw-text-opacity))
}

.text-green-500 {
    --tw-text-opacity: 1;
    color: rgb(34 197 94/var(--tw-text-opacity))
}

.text-gray-400 {
    --tw-text-opacity: 1;
    color: rgb(160 174 192/var(--tw-text-opacity))
}

.text-gray-900 {
    --tw-text-opacity: 1;
    color: rgb(27 37 89/var(--tw-text-opacity))
}

.text-gray-800 {
    --tw-text-opacity: 1;
    color: rgb(37 47 64/var(--tw-text-opacity))
}

.text-orange-500 {
    --tw-text-opacity: 1;
    color: rgb(249 115 22/var(--tw-text-opacity))
}

.text-\[\#E3DAFF\] {
    --tw-text-opacity: 1;
    color: rgb(227 218 255/var(--tw-text-opacity))
}

.text-lightPrimary {
    --tw-text-opacity: 1;
    color: rgb(244 247 254/var(--tw-text-opacity))
}

.shadow-xl {
    --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, .1), 0 8px 10px -6px rgba(0, 0, 0, .1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)
}

.shadow-3xl,
.shadow-xl {
    box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-3xl {
    --tw-shadow: 14px 17px 40px 4px;
    --tw-shadow-colored: 14px 17px 40px 4px var(--tw-shadow-color)
}

.shadow-2xl {
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, .25);
    --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
    box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-shadow-500 {
    --tw-shadow-color: rgba(112, 144, 176, .08);
    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-white\/5 {
    --tw-shadow-color: hsla(0, 0%, 100%, .05);
    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-gray-100 {
    --tw-shadow-color: #edf2f7;
    --tw-shadow: var(--tw-shadow-colored)
}

.outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px
}

.filter {
    -webkit-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.backdrop-blur-xl {
    --tw-backdrop-blur: blur(24px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)
}

.transition {
    transition-duration: .15s;
    transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.transition-all {
    transition-duration: .15s;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.\!transition {
    transition-duration: .15s !important;
    transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter !important;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter !important;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter !important;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1) !important
}

.duration-200 {
    transition-duration: .2s
}

.duration-300 {
    transition-duration: .3s
}

.duration-\[0\.2s\] {
    transition-duration: .2s
}

.duration-\[0\.5s\] {
    transition-duration: .5s
}

.\!duration-200 {
    transition-duration: .2s !important
}

.ease-in-out {
    transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.pe-2 {
    -webkit-padding-end: .5rem;
    padding-inline-end: .5rem
}

.ps-3 {
    -webkit-padding-start: .75rem;
    padding-inline-start: .75rem
}

.pe-16 {
    -webkit-padding-end: 4rem;
    padding-inline-end: 4rem
}

.pe-28 {
    -webkit-padding-end: 7rem;
    padding-inline-end: 7rem
}

.ms-1 {
    -webkit-margin-start: .25rem;
    margin-inline-start: .25rem
}

.ms-2 {
    -webkit-margin-start: .5rem;
    margin-inline-start: .5rem
}

.me-2 {
    -webkit-margin-end: .5rem;
    margin-inline-end: .5rem
}

.ms-4 {
    -webkit-margin-start: 1rem;
    margin-inline-start: 1rem
}

[dir=rtl] .end-0 {
    left: 0
}

[dir=ltr] .end-0 {
    right: 0
}

[dir=rtl] .end-4 {
    left: 1rem
}

[dir=ltr] .end-4 {
    right: 1rem
}

[dir=rtl] .text-start {
    text-align: right
}

[dir=ltr] .text-start {
    text-align: left
}

input.defaultCheckbox:before {
    color: #fff;
    content: url(/static/media/checked.6cb596af2bbf729dfac3.svg);
    height: 16px;
    left: 50%;
    opacity: 0;
    position: absolute;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
    width: 16px
}

input:checked.defaultCheckbox:before {
    opacity: 1
}

.placeholder\:text-red-500::-webkit-input-placeholder {
    --tw-text-opacity: 1;
    color: rgb(245 57 57/var(--tw-text-opacity))
}

.placeholder\:text-red-500::placeholder {
    --tw-text-opacity: 1;
    color: rgb(245 57 57/var(--tw-text-opacity))
}

.placeholder\:text-green-500::-webkit-input-placeholder {
    --tw-text-opacity: 1;
    color: rgb(34 197 94/var(--tw-text-opacity))
}

.placeholder\:text-green-500::placeholder {
    --tw-text-opacity: 1;
    color: rgb(34 197 94/var(--tw-text-opacity))
}

.placeholder\:\!text-gray-400::-webkit-input-placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(160 174 192/var(--tw-text-opacity)) !important
}

.placeholder\:\!text-gray-400::placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(160 174 192/var(--tw-text-opacity)) !important
}

.before\:absolute:before {
    content: var(--tw-content);
    position: absolute
}

.before\:top-\[3px\]:before {
    content: var(--tw-content);
    top: 3px
}

.before\:left-\[50\%\]:before {
    content: var(--tw-content);
    left: 50%
}

.before\:top-\[50\%\]:before {
    content: var(--tw-content);
    top: 50%
}

.before\:h-3:before {
    content: var(--tw-content);
    height: .75rem
}

.before\:h-4:before {
    content: var(--tw-content);
    height: 1rem
}

.before\:w-3:before {
    content: var(--tw-content);
    width: .75rem
}

.before\:w-4:before {
    content: var(--tw-content);
    width: 1rem
}

.before\:translate-x-\[-50\%\]:before {
    --tw-translate-x: -50%
}

.before\:translate-x-\[-50\%\]:before,
.before\:translate-x-\[2px\]:before {
    content: var(--tw-content);
    -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.before\:translate-x-\[2px\]:before {
    --tw-translate-x: 2px
}

.before\:translate-y-\[-50\%\]:before {
    --tw-translate-y: -50%;
    content: var(--tw-content);
    -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.before\:rounded-full:before {
    border-radius: 9999px;
    content: var(--tw-content)
}

.before\:rounded-\[20px\]:before {
    border-radius: 20px;
    content: var(--tw-content)
}

.before\:bg-white:before {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255/var(--tw-bg-opacity));
    content: var(--tw-content)
}

.before\:shadow-\[0_2px_5px_rgba\(0\2c _0\2c _0\2c _\.2\)\]:before {
    --tw-shadow: 0 2px 5px rgba(0, 0, 0, .2);
    --tw-shadow-colored: 0 2px 5px var(--tw-shadow-color);
    box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    content: var(--tw-content)
}

.before\:transition-all:before {
    content: var(--tw-content);
    transition-duration: .15s;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.before\:transition:before {
    content: var(--tw-content);
    transition-duration: .15s;
    transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-transform, -webkit-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1)
}

.before\:duration-\[0\.2s\]:before {
    content: var(--tw-content);
    transition-duration: .2s
}

.before\:content-\[\"\"\]:before {
    --tw-content: "";
    content: var(--tw-content)
}

.checked\:border-none:checked {
    border-style: none
}

.checked\:\!border-red-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(245 57 57/var(--tw-border-opacity)) !important
}

.checked\:\!border-blue-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(59 130 246/var(--tw-border-opacity)) !important
}

.checked\:\!border-green-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(34 197 94/var(--tw-border-opacity)) !important
}

.checked\:\!border-yellow-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(234 179 8/var(--tw-border-opacity)) !important
}

.checked\:\!border-orange-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(249 115 22/var(--tw-border-opacity)) !important
}

.checked\:\!border-teal-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(20 184 166/var(--tw-border-opacity)) !important
}

.checked\:\!border-navy-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(27 59 187/var(--tw-border-opacity)) !important
}

.checked\:\!border-lime-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(130 214 22/var(--tw-border-opacity)) !important
}

.checked\:\!border-cyan-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(23 193 232/var(--tw-border-opacity)) !important
}

.checked\:\!border-pink-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(255 0 128/var(--tw-border-opacity)) !important
}

.checked\:\!border-purple-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(168 85 247/var(--tw-border-opacity)) !important
}

.checked\:\!border-amber-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(245 158 11/var(--tw-border-opacity)) !important
}

.checked\:\!border-indigo-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(99 102 241/var(--tw-border-opacity)) !important
}

.checked\:\!border-gray-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(173 181 189/var(--tw-border-opacity)) !important
}

.checked\:\!border-brand-500:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(66 42 251/var(--tw-border-opacity)) !important
}

.checked\:bg-red-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(245 57 57/var(--tw-bg-opacity))
}

.checked\:bg-blue-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(59 130 246/var(--tw-bg-opacity))
}

.checked\:bg-green-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(34 197 94/var(--tw-bg-opacity))
}

.checked\:bg-yellow-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(234 179 8/var(--tw-bg-opacity))
}

.checked\:bg-orange-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(249 115 22/var(--tw-bg-opacity))
}

.checked\:bg-teal-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(20 184 166/var(--tw-bg-opacity))
}

.checked\:bg-navy-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(27 59 187/var(--tw-bg-opacity))
}

.checked\:bg-lime-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(130 214 22/var(--tw-bg-opacity))
}

.checked\:bg-cyan-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(23 193 232/var(--tw-bg-opacity))
}

.checked\:bg-pink-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(255 0 128/var(--tw-bg-opacity))
}

.checked\:bg-purple-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(168 85 247/var(--tw-bg-opacity))
}

.checked\:bg-amber-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(245 158 11/var(--tw-bg-opacity))
}

.checked\:bg-indigo-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(99 102 241/var(--tw-bg-opacity))
}

.checked\:bg-gray-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(173 181 189/var(--tw-bg-opacity))
}

.checked\:bg-brand-500:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(66 42 251/var(--tw-bg-opacity))
}

.checked\:text-white:checked {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
}

.checked\:before\:translate-x-\[22px\]:checked:before {
    --tw-translate-x: 22px;
    content: var(--tw-content);
    -webkit-transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.checked\:before\:\!bg-red-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(245 57 57/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-blue-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(59 130 246/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-green-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(34 197 94/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-yellow-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(234 179 8/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-orange-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(249 115 22/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-teal-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(20 184 166/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-navy-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(27 59 187/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-lime-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(130 214 22/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-cyan-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(23 193 232/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-pink-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(255 0 128/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-purple-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(168 85 247/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-amber-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(245 158 11/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-indigo-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(99 102 241/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-gray-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(173 181 189/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.checked\:before\:\!bg-brand-500:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(66 42 251/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.hover\:cursor-pointer:hover {
    cursor: pointer
}

.hover\:bg-gray-100:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(237 242 247/var(--tw-bg-opacity))
}

.hover\:bg-gray-50:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(248 249 250/var(--tw-bg-opacity))
}

.hover\:bg-brand-800:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(25 7 147/var(--tw-bg-opacity))
}

.hover\:bg-brand-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(51 17 219/var(--tw-bg-opacity))
}

.hover\:bg-gray-200:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(233 236 239/var(--tw-bg-opacity))
}

.hover\:\!bg-white\/80:hover {
    background-color: hsla(0, 0%, 100%, .8) !important
}

.hover\:bg-none:hover {
    background-image: none
}

.hover\:bg-gradient-to-b:hover {
    background-image: linear-gradient(to bottom, var(--tw-gradient-stops))
}

.hover\:from-white\/40:hover {
    --tw-gradient-from: hsla(0, 0%, 100%, .4);
    --tw-gradient-to: hsla(0, 0%, 100%, 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.hover\:to-white\/5:hover {
    --tw-gradient-to: hsla(0, 0%, 100%, .05)
}

.hover\:font-medium:hover {
    font-weight: 500
}

.hover\:text-gray-600:hover {
    --tw-text-opacity: 1;
    color: rgb(163 174 208/var(--tw-text-opacity))
}

.hover\:text-navy-700:hover {
    --tw-text-opacity: 1;
    color: rgb(27 37 75/var(--tw-text-opacity))
}

.hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
}

.hover\:text-red-500:hover {
    --tw-text-opacity: 1;
    color: rgb(245 57 57/var(--tw-text-opacity))
}

.hover\:text-brand-600:hover {
    --tw-text-opacity: 1;
    color: rgb(51 17 219/var(--tw-text-opacity))
}

.hover\:text-brand-500:hover {
    --tw-text-opacity: 1;
    color: rgb(66 42 251/var(--tw-text-opacity))
}

.hover\:text-lightPrimary:hover {
    --tw-text-opacity: 1;
    color: rgb(244 247 254/var(--tw-text-opacity))
}

.hover\:underline:hover {
    -webkit-text-decoration-line: underline;
    text-decoration-line: underline
}

.hover\:shadow-2xl:hover {
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, .25);
    --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
    box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.active\:bg-brand-700:active {
    --tw-bg-opacity: 1;
    background-color: rgb(33 17 165/var(--tw-bg-opacity))
}

.active\:bg-gray-200:active {
    --tw-bg-opacity: 1;
    background-color: rgb(233 236 239/var(--tw-bg-opacity))
}

.active\:\!bg-white\/70:active {
    background-color: hsla(0, 0%, 100%, .7) !important
}

.active\:bg-none:active {
    background-image: none
}

.dark .dark\:\!border-navy-800 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(17 28 68/var(--tw-border-opacity)) !important
}

.dark .dark\:border-white\/10 {
    border-color: hsla(0, 0%, 100%, .1)
}

.dark .dark\:\!border-red-400 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(248 113 113/var(--tw-border-opacity)) !important
}

.dark .dark\:\!border-green-400 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(74 222 128/var(--tw-border-opacity)) !important
}

.dark .dark\:\!border-white\/10 {
    border-color: hsla(0, 0%, 100%, .1) !important
}

.dark .dark\:\!border-gray-800 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(37 47 64/var(--tw-border-opacity)) !important
}

.dark .dark\:\!border-navy-700 {
    --tw-border-opacity: 1 !important;
    border-color: rgb(27 37 75/var(--tw-border-opacity)) !important
}

.dark .dark\:bg-navy-700 {
    --tw-bg-opacity: 1;
    background-color: rgb(27 37 75/var(--tw-bg-opacity))
}

.dark .dark\:\!bg-navy-700 {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(27 37 75/var(--tw-bg-opacity)) !important
}

.dark .dark\:bg-gray-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(37 47 64/var(--tw-bg-opacity))
}

.dark .dark\:bg-brand-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(117 81 255/var(--tw-bg-opacity))
}

.dark .dark\:\!bg-navy-800 {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(17 28 68/var(--tw-bg-opacity)) !important
}

.dark .dark\:\!bg-white\/5 {
    background-color: hsla(0, 0%, 100%, .05) !important
}

.dark .dark\:bg-\[\#0b14374d\] {
    background-color: #0b14374d
}

.dark .dark\:bg-navy-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(11 20 55/var(--tw-bg-opacity))
}

.dark .dark\:bg-white\/20 {
    background-color: hsla(0, 0%, 100%, .2)
}

.dark .dark\:bg-red-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(248 113 113/var(--tw-bg-opacity))
}

.dark .dark\:bg-blue-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(96 165 250/var(--tw-bg-opacity))
}

.dark .dark\:bg-green-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(74 222 128/var(--tw-bg-opacity))
}

.dark .dark\:bg-yellow-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(251 207 51/var(--tw-bg-opacity))
}

.dark .dark\:bg-orange-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(251 146 60/var(--tw-bg-opacity))
}

.dark .dark\:bg-teal-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(45 212 191/var(--tw-bg-opacity))
}

.dark .dark\:bg-navy-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(54 82 186/var(--tw-bg-opacity))
}

.dark .dark\:bg-lime-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(152 236 45/var(--tw-bg-opacity))
}

.dark .dark\:bg-cyan-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(33 212 253/var(--tw-bg-opacity))
}

.dark .dark\:bg-pink-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(244 114 182/var(--tw-bg-opacity))
}

.dark .dark\:bg-purple-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(192 132 252/var(--tw-bg-opacity))
}

.dark .dark\:bg-amber-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(251 191 36/var(--tw-bg-opacity))
}

.dark .dark\:bg-indigo-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(129 140 248/var(--tw-bg-opacity))
}

.dark .dark\:bg-gray-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(160 174 192/var(--tw-bg-opacity))
}

.dark .dark\:bg-white\/30 {
    background-color: hsla(0, 0%, 100%, .3)
}

.dark .dark\:bg-white\/5 {
    background-color: hsla(0, 0%, 100%, .05)
}

.dark .dark\:\!bg-navy-900 {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(11 20 55/var(--tw-bg-opacity)) !important
}

.dark .dark\:bg-navy-800 {
    --tw-bg-opacity: 1;
    background-color: rgb(17 28 68/var(--tw-bg-opacity))
}

.dark .dark\:bg-white\/10 {
    background-color: hsla(0, 0%, 100%, .1)
}

.dark .dark\:bg-indigo-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(224 231 255/var(--tw-bg-opacity))
}

.dark .dark\:\!bg-white {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(255 255 255/var(--tw-bg-opacity)) !important
}

.dark .dark\:text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
}

.dark .dark\:text-navy-900 {
    --tw-text-opacity: 1;
    color: rgb(11 20 55/var(--tw-text-opacity))
}

.dark .dark\:\!text-red-400 {
    --tw-text-opacity: 1 !important;
    color: rgb(248 113 113/var(--tw-text-opacity)) !important
}

.dark .dark\:\!text-green-400 {
    --tw-text-opacity: 1 !important;
    color: rgb(74 222 128/var(--tw-text-opacity)) !important
}

.dark .dark\:text-gray-600 {
    --tw-text-opacity: 1;
    color: rgb(163 174 208/var(--tw-text-opacity))
}

.dark .dark\:shadow-none {
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    box-shadow: 0 0 #0000, 0 0 #0000, var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.dark .dark\:placeholder\:\!text-\[rgba\(255\2c 255\2c 255\2c 0\.15\)\]::-webkit-input-placeholder {
    color: hsla(0, 0%, 100%, .15) !important
}

.dark .dark\:placeholder\:\!text-\[rgba\(255\2c 255\2c 255\2c 0\.15\)\]::placeholder {
    color: hsla(0, 0%, 100%, .15) !important
}

.dark .dark\:placeholder\:\!text-red-400::-webkit-input-placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(248 113 113/var(--tw-text-opacity)) !important
}

.dark .dark\:placeholder\:\!text-red-400::placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(248 113 113/var(--tw-text-opacity)) !important
}

.dark .dark\:placeholder\:\!text-green-400::-webkit-input-placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(74 222 128/var(--tw-text-opacity)) !important
}

.dark .dark\:placeholder\:\!text-green-400::placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(74 222 128/var(--tw-text-opacity)) !important
}

.dark .dark\:placeholder\:\!text-white::-webkit-input-placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(255 255 255/var(--tw-text-opacity)) !important
}

.dark .dark\:placeholder\:\!text-white::placeholder {
    --tw-text-opacity: 1 !important;
    color: rgb(255 255 255/var(--tw-text-opacity)) !important
}

.dark .dark\:checked\:\!border-red-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(248 113 113/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-blue-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(96 165 250/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-green-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(74 222 128/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-yellow-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(251 207 51/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-orange-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(251 146 60/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-teal-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(45 212 191/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-navy-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(54 82 186/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-lime-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(152 236 45/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-cyan-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(33 212 253/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-pink-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(244 114 182/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-purple-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(192 132 252/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-amber-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(251 191 36/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-indigo-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(129 140 248/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-gray-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(160 174 192/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:\!border-brand-400:checked {
    --tw-border-opacity: 1 !important;
    border-color: rgb(117 81 255/var(--tw-border-opacity)) !important
}

.dark .dark\:checked\:bg-red-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(248 113 113/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-blue-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(96 165 250/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-green-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(74 222 128/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-yellow-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(251 207 51/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-orange-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(251 146 60/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-teal-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(45 212 191/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-navy-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(54 82 186/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-lime-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(152 236 45/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-cyan-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(33 212 253/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-pink-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(244 114 182/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-purple-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(192 132 252/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-amber-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(251 191 36/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-indigo-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(129 140 248/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-gray-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(160 174 192/var(--tw-bg-opacity))
}

.dark .dark\:checked\:bg-brand-400:checked {
    --tw-bg-opacity: 1;
    background-color: rgb(117 81 255/var(--tw-bg-opacity))
}

.dark .dark\:checked\:before\:\!bg-red-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(248 113 113/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-blue-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(96 165 250/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-green-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(74 222 128/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-yellow-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(251 207 51/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-orange-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(251 146 60/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-teal-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(45 212 191/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-navy-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(54 82 186/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-lime-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(152 236 45/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-cyan-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(33 212 253/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-pink-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(244 114 182/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-purple-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(192 132 252/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-amber-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(251 191 36/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-indigo-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(129 140 248/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-gray-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(160 174 192/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:checked\:before\:\!bg-brand-400:checked:before {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(117 81 255/var(--tw-bg-opacity)) !important;
    content: var(--tw-content)
}

.dark .dark\:hover\:bg-white\/20:hover {
    background-color: hsla(0, 0%, 100%, .2)
}

.dark .dark\:hover\:bg-brand-300:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(129 113 252/var(--tw-bg-opacity))
}

.dark .dark\:hover\:bg-white\/10:hover {
    background-color: hsla(0, 0%, 100%, .1)
}

.dark .dark\:hover\:\!bg-navy-700:hover {
    --tw-bg-opacity: 1 !important;
    background-color: rgb(27 37 75/var(--tw-bg-opacity)) !important
}

.dark .dark\:hover\:text-white:hover,
.dark .hover\:dark\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255/var(--tw-text-opacity))
}

.dark .dark\:hover\:opacity-90:hover {
    opacity: .9
}

.dark .dark\:active\:bg-white\/10:active {
    background-color: hsla(0, 0%, 100%, .1)
}

.dark .dark\:active\:bg-brand-200:active {
    --tw-bg-opacity: 1;
    background-color: rgb(161 149 253/var(--tw-bg-opacity))
}

.dark .dark\:active\:bg-white\/20:active {
    background-color: hsla(0, 0%, 100%, .2)
}

.dark .dark\:active\:opacity-90:active {
    opacity: .9
}

.dark .dark\:active\:opacity-80:active {
    opacity: .8
}

@media (min-width:576px) {
    .sm\:\!mb-0 {
        margin-bottom: 0 !important
    }

    .sm\:w-fit {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content
    }

    .sm\:w-\[460px\] {
        width: 460px
    }

    .sm\:flex-wrap {
        flex-wrap: wrap
    }

    .sm\:flex-nowrap {
        flex-wrap: nowrap
    }

    .sm\:justify-start {
        justify-content: flex-start
    }

    .sm\:overflow-auto {
        overflow: auto
    }

    .sm\:overflow-x-auto {
        overflow-x: auto
    }

    .sm\:text-\[14px\] {
        font-size: 14px
    }

    .sm\:text-xs {
        font-size: .75rem;
        line-height: 1rem
    }
}

@media (min-width:768px) {
    .md\:-left-\[440px\] {
        left: -440px
    }

    .md\:-left-\[330px\] {
        left: -330px
    }

    .md\:\!z-50 {
        z-index: 50 !important
    }

    .md\:mx-0 {
        margin-left: 0;
        margin-right: 0
    }

    .md\:mt-2 {
        margin-top: .5rem
    }

    .md\:mt-0 {
        margin-top: 0
    }

    .md\:mt-16 {
        margin-top: 4rem
    }

    .md\:block {
        display: block
    }

    .md\:w-\[365px\] {
        width: 365px
    }

    .md\:w-\[64\%\] {
        width: 64%
    }

    .md\:max-w-\[75\%\] {
        max-width: 75%
    }

    .md\:flex-grow-0 {
        flex-grow: 0
    }

    .md\:origin-top-right {
        -webkit-transform-origin: top right;
        transform-origin: top right
    }

    .md\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr))
    }

    .md\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr))
    }

    .md\:flex-row {
        flex-direction: row
    }

    .md\:flex-col {
        flex-direction: column
    }

    .md\:items-start {
        align-items: flex-start
    }

    .md\:items-center {
        align-items: center
    }

    .md\:justify-center {
        justify-content: center
    }

    .md\:gap-10 {
        gap: 2.5rem
    }

    .md\:gap-1 {
        gap: .25rem
    }

    .md\:\!gap-5 {
        gap: 1.25rem !important
    }

    .md\:\!gap-14 {
        gap: 3.5rem !important
    }

    .md\:overflow-x-hidden {
        overflow-x: hidden
    }

    .md\:px-0 {
        padding-left: 0;
        padding-right: 0
    }

    .md\:px-\[64px\] {
        padding-left: 64px;
        padding-right: 64px
    }

    .md\:py-\[56px\] {
        padding-bottom: 56px;
        padding-top: 56px
    }

    .md\:\!px-0 {
        padding-left: 0 !important;
        padding-right: 0 !important
    }

    .md\:pr-2 {
        padding-right: .5rem
    }

    .md\:pr-0 {
        padding-right: 0
    }

    .md\:pl-12 {
        padding-left: 3rem
    }

    .md\:pl-4 {
        padding-left: 1rem
    }

    .md\:text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem
    }

    .md\:text-base {
        font-size: 1rem;
        line-height: 1.5rem
    }

    .md\:text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem
    }

    .md\:leading-\[42px\] {
        line-height: 42px
    }

    .md\:pe-2 {
        -webkit-padding-end: .5rem;
        padding-inline-end: .5rem
    }

    [dir=ltr] .md\:origin-top-start {
        -webkit-transform-origin: top left;
        transform-origin: top left
    }

    [dir=rtl] .md\:origin-top-start {
        -webkit-transform-origin: top right;
        transform-origin: top right
    }
}

@media (min-width:992px) {
    .lg\:\!z-50 {
        z-index: 50 !important
    }

    .lg\:col-span-6 {
        grid-column: span 6/span 6
    }

    .lg\:col-span-12 {
        grid-column: span 12/span 12
    }

    .lg\:mt-0 {
        margin-top: 0
    }

    .lg\:mb-6 {
        margin-bottom: 1.5rem
    }

    .lg\:mb-0 {
        margin-bottom: 0
    }

    .lg\:mb-10 {
        margin-bottom: 2.5rem
    }

    .lg\:\!mb-0 {
        margin-bottom: 0 !important
    }

    .lg\:grid {
        display: grid
    }

    .lg\:h-screen {
        height: 100vh
    }

    .lg\:w-\[49vw\] {
        width: 49vw
    }

    .lg\:w-\[46\%\] {
        width: 46%
    }

    .lg\:w-\[40\%\] {
        width: 40%
    }

    .lg\:max-w-\[65\%\] {
        max-width: 65%
    }

    .lg\:max-w-\[100\%\] {
        max-width: 100%
    }

    .lg\:max-w-\[1013px\] {
        max-width: 1013px
    }

    .lg\:max-w-\[48\%\] {
        max-width: 48%
    }

    .lg\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr))
    }

    .lg\:grid-cols-12 {
        grid-template-columns: repeat(12, minmax(0, 1fr))
    }

    .lg\:\!grid-cols-12 {
        grid-template-columns: repeat(12, minmax(0, 1fr)) !important
    }

    .lg\:flex-row {
        flex-direction: row
    }

    .lg\:flex-nowrap {
        flex-wrap: nowrap
    }

    .lg\:items-center {
        align-items: center
    }

    .lg\:justify-start {
        justify-content: flex-start
    }

    .lg\:justify-between {
        justify-content: space-between
    }

    .lg\:rounded-bl-\[120px\] {
        border-bottom-left-radius: 120px
    }

    .lg\:px-8 {
        padding-left: 2rem;
        padding-right: 2rem
    }

    .lg\:pt-0 {
        padding-top: 0
    }

    .lg\:pl-0 {
        padding-left: 0
    }

    .lg\:pt-10 {
        padding-top: 2.5rem
    }

    .lg\:pb-0 {
        padding-bottom: 0
    }

    .lg\:text-xs {
        font-size: .75rem;
        line-height: 1rem
    }

    .lg\:hover\:text-white:hover,
    .lg\:text-white {
        --tw-text-opacity: 1;
        color: rgb(255 255 255/var(--tw-text-opacity))
    }
}

@media (min-width:1200px) {
    .xl\:\!z-0 {
        z-index: 0 !important
    }

    .xl\:col-span-1 {
        grid-column: span 1/span 1
    }

    .xl\:mb-2 {
        margin-bottom: .5rem
    }

    .xl\:ml-\[313px\] {
        margin-left: 313px
    }

    .xl\:mr-\[313px\] {
        margin-right: 313px
    }

    .xl\:hidden {
        display: none
    }

    .xl\:h-\[100vh\] {
        height: 100vh
    }

    .xl\:h-\[350px\] {
        height: 350px
    }

    .xl\:w-\[1310px\] {
        width: 1310px
    }

    .xl\:w-\[365px\] {
        width: 365px
    }

    .xl\:w-\[225px\] {
        width: 225px
    }

    .xl\:w-\[85\%\] {
        width: 85%
    }

    .xl\:w-\[72\%\] {
        width: 72%
    }

    .xl\:max-w-\[1383px\] {
        max-width: 1383px
    }

    .xl\:max-w-full {
        max-width: 100%
    }

    .xl\:max-w-\[420px\] {
        max-width: 420px
    }

    .xl\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr))
    }

    .xl\:flex-row {
        flex-direction: row
    }

    .xl\:flex-col {
        flex-direction: column
    }

    .xl\:items-start {
        align-items: flex-start
    }

    .xl\:gap-2 {
        gap: .5rem
    }

    .xl\:overflow-hidden {
        overflow: hidden
    }

    .xl\:overflow-x-hidden {
        overflow-x: hidden
    }

    .xl\:rounded-bl-\[200px\] {
        border-bottom-left-radius: 200px
    }

    .xl\:px-0 {
        padding-left: 0;
        padding-right: 0
    }

    .xl\:\!px-8 {
        padding-left: 2rem !important;
        padding-right: 2rem !important
    }

    .xl\:pb-6 {
        padding-bottom: 1.5rem
    }

    .xl\:pl-\[70px\] {
        padding-left: 70px
    }
}

@media (min-width:1320px) {
    .\32xl\:col-span-2 {
        grid-column: span 2/span 2
    }

    .\32xl\:col-span-1 {
        grid-column: span 1/span 1
    }

    .\32xl\:col-span-6 {
        grid-column: span 6/span 6
    }

    .\32xl\:ml-2 {
        margin-left: .5rem
    }

    .\32xl\:w-\[44vw\] {
        width: 44vw
    }

    .\32xl\:w-\[75\%\] {
        width: 75%
    }

    .\32xl\:w-\[60\%\] {
        width: 60%
    }

    .\32xl\:grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr))
    }

    .\32xl\:grid-cols-11 {
        grid-template-columns: repeat(11, minmax(0, 1fr))
    }

    .\32xl\:items-start {
        align-items: flex-start
    }

    .\32xl\:\!gap-12 {
        gap: 3rem !important
    }

    .\32xl\:gap-10 {
        gap: 2.5rem
    }

    .\32xl\:overflow-hidden {
        overflow: hidden
    }
}

@media (min-width:1600px) {
    .\33xl\:col-span-4 {
        grid-column: span 4/span 4
    }

    .\33xl\:col-span-5 {
        grid-column: span 5/span 5
    }

    .\33xl\:\!col-span-3 {
        grid-column: span 3/span 3 !important
    }

    .\33xl\:h-full {
        height: 100%
    }

    .\33xl\:w-full {
        width: 100%
    }

    .\33xl\:w-\[52\%\] {
        width: 52%
    }

    .\33xl\:w-\[45\%\] {
        width: 45%
    }

    .\33xl\:grid-cols-6 {
        grid-template-columns: repeat(6, minmax(0, 1fr))
    }

    .\33xl\:flex-row {
        flex-direction: row
    }

    .\33xl\:items-center {
        align-items: center
    }

    .\33xl\:justify-between {
        justify-content: space-between
    }
}

.react-calendar {
    background: #fff;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    max-width: 100%;
    width: 350px
}

.react-calendar--doubleView {
    width: 700px
}

.react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -.5em
}

.react-calendar--doubleView .react-calendar__viewContainer>* {
    margin: .5em;
    width: 50%
}

.react-calendar,
.react-calendar *,
.react-calendar :after,
.react-calendar :before {
    box-sizing: border-box
}

.react-calendar button {
    border: 0;
    margin: 0;
    outline: none
}

.react-calendar button:enabled:hover {
    cursor: pointer
}

.react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em
}

.react-calendar__navigation button {
    background: none;
    min-width: 44px
}

.react-calendar__navigation button:disabled {
    background-color: #f0f0f0
}

.react-calendar__navigation button:enabled:focus,
.react-calendar__navigation button:enabled:hover {
    background-color: #e6e6e6
}

.react-calendar__month-view__weekdays {
    font-size: .75em;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase
}

.react-calendar__month-view__weekdays__weekday {
    padding: .5em
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
    align-items: center;
    display: flex;
    font-size: .75em;
    font-weight: 700;
    justify-content: center
}

.react-calendar__month-view__days__day--weekend {
    color: #d10000
}

.react-calendar__month-view__days__day--neighboringMonth {
    color: #757575
}

.react-calendar__century-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__year-view .react-calendar__tile {
    padding: 2em .5em
}

.react-calendar__tile {
    background: none;
    line-height: 16px;
    max-width: 100%;
    padding: 10px 6.6667px;
    text-align: center
}

.react-calendar__tile:disabled {
    background-color: #f0f0f0
}

.react-calendar__tile:enabled:focus,
.react-calendar__tile:enabled:hover {
    background-color: #e6e6e6
}

.react-calendar__tile--now {
    background: #ffff76
}

.react-calendar__tile--now:enabled:focus,
.react-calendar__tile--now:enabled:hover {
    background: #ffffa9
}

.react-calendar__tile--hasActive {
    background: #76baff
}

.react-calendar__tile--hasActive:enabled:focus,
.react-calendar__tile--hasActive:enabled:hover {
    background: #a9d4ff
}

.react-calendar__tile--active {
    background: #006edc;
    color: #fff
}

.react-calendar__tile--active:enabled:focus,
.react-calendar__tile--active:enabled:hover {
    background: #1087ff
}

.react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6
}

.react-calendar {
    background-color: initial;
    border: initial;
    font-family: DM Sans, sans-serif
}

.react-calendar__navigation__next2-button,
.react-calendar__navigation__prev2-button {
    display: none
}

.react-calendar__navigation {
    align-items: center
}

abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: unset;
    text-decoration: none !important;
    text-decoration: initial !important
}

.react-calendar__navigation__next-button,
.react-calendar__navigation__prev-button {
    background-color: #4318ff !important;
    border-radius: 10px;
    color: #fff;
    height: 34px !important;
    min-width: 34px !important
}

.react-calendar__navigation__next-button {
    width: 34px !important
}

.react-calendar__navigation__label {
    font-size: 18px;
    font-weight: 700 !important
}

.react-calendar__navigation__label:focus,
.react-calendar__navigation__label:hover {
    background-color: initial !important;
    border-radius: 10px
}

.react-calendar__tile {
    align-items: center;
    color: #1b2559;
    display: flex;
    font-size: 12px;
    height: 34px !important;
    justify-content: center;
    padding: 0 !important
}

.react-calendar__month-view__weekdays {
    margin-bottom: 6px
}

.react-calendar__month-view__weekdays,
.react-calendar__tile--now,
.react-calendar__tile--now:enabled:focus,
.react-calendar__tile--now:enabled:hover {
    background-color: #f4f7fe;
    border-radius: 10px
}

.react-calendar__month-view__days__day--neighboringMonth {
    color: #b0bbd5
}

.react-calendar__tile--active,
.react-calendar__tile--active:enabled:focus,
.react-calendar__tile--active:enabled:hover {
    background: #4318ff;
    border-radius: 10px;
    color: #fff
}

.react-calendar__tile--range,
.react-calendar__tile--range:enabled:focus,
.react-calendar__tile--range:enabled:hover {
    background: #f4f7fe;
    border-radius: 0;
    color: #4318ff
}

.react-calendar__tile--rangeStart,
.react-calendar__tile--rangeStart:enabled:focus,
.react-calendar__tile--rangeStart:enabled:hover {
    background: #4318ff;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    color: #fff
}

.react-calendar__tile--rangeEnd,
.react-calendar__tile--rangeEnd:enabled:focus,
.react-calendar__tile--rangeEnd:enabled:hover {
    background: #4318ff;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    color: #fff
}

body.dark .react-calendar {
    border-radius: 30px
}

body.dark .react-calendar__navigation__prev-button {
    background-color: #7551ff !important
}

body.dark .react-calendar__navigation__next-button {
    background-color: #7551ff !important;
    color: #fff
}

body.dark .react-calendar__tile {
    color: #fff
}

body.dark .react-calendar__month-view__weekdays,
body.dark .react-calendar__tile--now,
body.dark .react-calendar__tile--now:enabled:focus,
body.dark .react-calendar__tile--now:enabled:hover,
body.dark .react-calendar__tile:enabled:focus,
body.dark .react-calendar__tile:enabled:hover {
    background-color: hsla(0, 0%, 100%, .1)
}

body.dark .react-calendar__month-view__days__day--neighboringMonth {
    color: #b0bbd5
}

body.dark .react-calendar__tile--active,
body.dark .react-calendar__tile--active:enabled:focus,
body.dark .react-calendar__tile--active:enabled:hover {
    background: #7551ff;
    color: #fff
}

body.dark .react-calendar__tile--range,
body.dark .react-calendar__tile--range:enabled:focus,
body.dark .react-calendar__tile--range:enabled:hover {
    background: hsla(0, 0%, 100%, .1);
    color: #7551ff
}

body.dark .react-calendar__tile--rangeEnd,
body.dark .react-calendar__tile--rangeEnd:enabled:focus,
body.dark .react-calendar__tile--rangeEnd:enabled:hover,
body.dark .react-calendar__tile--rangeStart,
body.dark .react-calendar__tile--rangeStart:enabled:focus,
body.dark .react-calendar__tile--rangeStart:enabled:hover {
    background: #7551ff;
    color: #fff
}
</style>