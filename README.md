# Video Flip Editor

This project is a **Dynamic Flip Screen** application that allows users to crop video content dynamically. The application integrates a video player, an overlay cropper layer with multiple aspect ratios, and provides a dynamic preview of the cropped segment.

## Features

- **Video Player Integration**:  
  - Play, pause, and seek controls.
  - Playback rate control with options (0.5x, 1x, 1.5x, 2x).
  - Volume control.
  
- **Cropper Layer**:  
  - Overlay on the video player with support for aspect ratios: 9:18, 9:16, 4:3, 3:4, 1:1, and 4:5.
  - Movable and resizable cropper that stays within the video player's dimensions.

- **Dynamic Preview**:  
  - Real-time preview of the cropped video in a designated area.
  - Aspect ratio matching between cropper and preview.
  - Negligible delay between video player and preview.

- **Recording and Exporting**:  
  - Records coordinates, volume, and playback rate at different timestamps.
  - Generates a downloadable JSON file with the recorded data.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Cloudinary**: For managing and serving video content.
- **Amplify**: Used for deployment.

## Live Demo

Check out the live application: [Live App](https://main.dsjo0rmy921ay.amplifyapp.com/)

## Installation and Setup

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SachinCoder1/take_home_assignment.git
    ```

2. Navigate to the project folder:
   ```bash
   cd take_home_assignment
   ```
3. Install dependencies:
   ``` bash
   npm install
   ```
4. Run the project:
    ``` bash
     npm start
   ```


### Building for Production
To create a production build:

```bash
npm run build
```



### Usage
Once the application is running, you can:

1. Upload or load a video (currently using a default video hosted on Cloudinary).
2. Crop the video using different aspect ratios and drag the cropper layer.
3. Preview the cropped video in real-time.
4. Generate JSON: Click the "Generate Preview" button to download a JSON file with cropper coordinates and other settings.

### Future Improvements
1. Add the ability to load custom videos.
2. Enhance the recording of cropper coordinates to include finer details.
3. Implement a feature to preview the recorded session using JSON data.
