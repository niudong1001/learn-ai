#include <opencv2\highgui\highgui.hpp>
#include <opencv2\imgproc\imgproc.hpp>
using namespace cv;

int main() {
	Mat srcImage = imread("dog.jpg");
	imshow("[Ô­Í¼]", srcImage);
	// ¸¯Ê´²Ù×÷
	Mat elem = getStructuringElement(MORPH_RECT, Size(15, 15));
	Mat dstImage;
	erode(srcImage, dstImage, elem);
	imshow("[¸¯Ê´Í¼]", dstImage);
	waitKey(0);

	return 0;
}