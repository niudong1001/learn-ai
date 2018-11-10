#include <opencv2\opencv.hpp>
using namespace cv;

int main() {
	VideoCapture capture("test.mp4");  // 读入视频
	while (1) {
		Mat frame;  // 存储每一帧
		capture >> frame;  // 读取当前帧
		if (frame.empty()) {   // 视频播放完成
			break;
		}
		imshow("读取视频", frame);
		waitKey(30);  // 延时30ms
	}
}