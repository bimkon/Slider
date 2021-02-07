// let slider = document.querySelector('.slider');
// let thumbMin = document.querySelector('.thumbmin');
// let thumbMax = document.querySelector('.thumbmax');
// let sliderCoords = getCoords(slider);
// let range = document.querySelector('.range');



//     thumbMin.onmousedown = function(event) {
//       event.preventDefault(); // предотвратить запуск выделения (действие браузера)
//       let thumbCoords = getCoords(thumbMin);
//       let shiftX = event.clientX - thumbCoords.left;


//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);

//       function onMouseMove(event) {
//         let newLeft = event.clientX - shiftX - sliderCoords.left;
//         let rightRange = sliderCoords.right - getCoords(thumbMax).right;
//         let bigbom = '10';
//         // курсор вышел из слайдера => оставить бегунок в его границах.
//         if (newLeft < 0) {
//           newLeft = 0;
//         }
//         let rightEdge = slider.offsetWidth - thumbMin.offsetWidth;
//         if (newLeft > rightEdge) {
//           newLeft = rightEdge;
//         }
                
//         thumbMin.style.left = newLeft + 'px';
//         range.style.left = newLeft + 'px';
//         range.style.right = rightRange + 'px';
//       }

//       function onMouseUp() {
//         document.removeEventListener('mouseup', onMouseUp);
//         document.removeEventListener('mousemove', onMouseMove);
//       }

//     };
//     thumbMax.onmousedown = function(event) {
//       event.preventDefault(); // предотвратить запуск выделения (действие браузера)
//       let thumbCoords = getCoords(thumbMax);
//       let shiftX = event.clientX - thumbCoords.left;
//       // shiftY здесь не нужен, слайдер двигается только по горизонтали

//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);

//       function onMouseMove(event) {
//         let newLeft = event.clientX - shiftX - sliderCoords.left;
//         let rightRange = sliderCoords.right - getCoords(thumbMax).right;
//         // курсор вышел из слайдера => оставить бегунок в его границах.
//         if (newLeft < 0) {
//           newLeft = 0;
//         }
//         let rightEdge = slider.offsetWidth - thumbMax.offsetWidth;
//         if (newLeft > rightEdge) {
//           newLeft = rightEdge;
//         }

//         thumbMax.style.left = newLeft + 'px';
//         range.style.right = rightRange + 'px';
//         range.style.left = getCoords(thumbMin).left - sliderCoords.left + 'px';

//       }

//       function onMouseUp() {
//         document.removeEventListener('mouseup', onMouseUp);
//         document.removeEventListener('mousemove', onMouseMove);
//       }

//     };
//     thumbMin.ondragstart = function() {
//       return false;
//     };
//     thumbMax.ondragstart = function() {
//       return false;
//     };
// function getCoords(elem) {
//     let box = elem.getBoundingClientRect();

//     return {
//         left: box.left + pageXOffset,
//         right: box.right + pageXOffset
//     };
// }