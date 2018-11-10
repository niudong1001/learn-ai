#include <opencv2\opencv.hpp>
#include <opencv2\imgproc\imgproc.hpp>
using namespace cv;

int main() {
	Mat srcImage = imread("dog.jpg");
	imshow("原图(边缘检测)", srcImage);
	Mat edge, grayImage;

	cvtColor(srcImage, grayImage, CV_RGB2GRAY); // 转灰度图

	blur(grayImage, edge, Size(3, 3)); // 降噪

	Canny(edge, edge, 3, 9, 3); // 运行canny算子

	imshow("效果图（边缘检测）", edge);

	waitKey(0);
	
	return 0;
}