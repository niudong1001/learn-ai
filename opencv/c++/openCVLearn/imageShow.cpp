#include <opencv2\opencv.hpp>
using namespace cv;

void main() {
	Mat srcImage = imread("dog.jpg");
	imshow("¹·Í¼", srcImage);
	waitKey(0);
}