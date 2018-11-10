#include <opencv2\highgui\highgui.hpp>
#include <opencv2\imgproc\imgproc.hpp>
using namespace cv;

int main() {
	Mat srcImage = imread("dog.jpg");
	imshow("原狗图", srcImage);
	// 进行均值滤波
	Mat dstImage;
	blur(srcImage, dstImage, Size(7, 7));
	imshow("滤波后狗图", dstImage);
	waitKey(0);
}