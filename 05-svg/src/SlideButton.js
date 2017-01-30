class SlideButton {

  constructor(element, text, textSuccess) {
    this.width = 1000;
    this.height = 50;

    this.element = element;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);

    const background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

    background.setAttribute('width', this.width.toString());
    background.setAttribute('height', this.height.toString());
    background.setAttribute('x', '0');
    background.setAttribute('y', '0');
    background.setAttribute('fill', '#428A3E');

    const backgroundText = document.createElementNS("http://www.w3.org/2000/svg", 'text');

    backgroundText.setAttribute('x', (this.width/2).toString());
    backgroundText.setAttribute('y', ((this.height/2)+8).toString());
    backgroundText.setAttribute('class', 'button-text');
    backgroundText.setAttribute('font-family', "Helvetica");

    backgroundText.append(text);

    this.sliderBackground = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

    this.sliderBackground.setAttribute('x', '0');
    this.sliderBackground.setAttribute('y', '0');
    this.sliderBackground.setAttribute('width', (this.width/5).toString());
    this.sliderBackground.setAttribute('height', this.height.toString());
    this.sliderBackground.setAttribute('fill', '#5CB65C');
    this.sliderBackground.setAttribute('class', 'draggable');

    this.sliderText = document.createElementNS("http://www.w3.org/2000/svg", 'text');

    this.sliderText.setAttribute('x', ((this.width/5) - 25).toString());
    this.sliderText.setAttribute('y', ((this.height/2)+8).toString());
    this.sliderText.setAttribute('class', 'button-text');
    this.sliderText.setAttribute('font-family', "Helvetica");

    this.sliderText.append('>');

    this.successText = document.createElementNS("http://www.w3.org/2000/svg", 'text');

    this.successText.setAttribute('x', (this.width/2).toString());
    this.successText.setAttribute('y', ((this.height/2)+8).toString());
    this.successText.setAttribute('class', 'button-text hidden');
    this.successText.setAttribute('font-family', "Helvetica");

    this.successText.append(textSuccess);

    svg.append(background);
    svg.append(backgroundText);
    svg.append(this.sliderBackground);
    svg.append(this.sliderText);
    svg.append(this.successText);


    this.element.append(svg);

    this.sliderBackground.addEventListener('mousedown', this.dragStart.bind(this));
    this.sliderBackground.addEventListener('mouseout', this.dragStop.bind(this));
    this.sliderBackground.addEventListener('mouseup', this.dragStop.bind(this));
    this.sliderBackground.addEventListener('mousemove', this.drag.bind(this));
  }

  dragStart(e) {
    this.isDragged = true;
    this.startX = e.x;
    this.startWidth = parseInt(this.sliderBackground.getAttribute('width'));
  }

  dragStop(e) {
    this.isDragged = false;
  }

  drag(e) {
    if (this.isDragged) {
      this.sliderBackground.setAttribute('width', (this.startWidth + (e.x - this.startX)).toString());
      this.sliderText.setAttribute('x', (this.startWidth -25 + (e.x - this.startX)).toString());

      if (this.startWidth + (e.x - this.startX) >= 0.9 * this.width) {
        this.successText.setAttribute('class', 'button-text');
      } else {
        this.successText.setAttribute('class', 'button-text hidden');
      }
    }
  }



}

export default SlideButton;
