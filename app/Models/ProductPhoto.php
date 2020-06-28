<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    /**
     * @param $productid
     * @return string
     */
    public static function photosPath($productid)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productid}");
    }

    /**
     * @param $product_id
     * @param array $files
     */
    public static function uploadFiles($productId, array $files)
    {
        $dir = self::photosDir($productId);
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    /**
     * @param $productId
     * @return string
     */
    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    /**
     * @param int $productId
     * @param array $files
     * @return Collection
     * @throws \Exception
     */
    public static function createWithPhotoFiles(int $productId, array $files) : Collection
    {
        try {
            self::uploadFiles($productId, $files);
            DB::beginTransaction();
            $photos = self::createPhotosModel($productId, $files);
            DB::commit();
            return new Collection($photos);
        } catch (\Exception $e) {
            self::deleteFiles($productId, $files);
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param int $productId
     * @param array $files
     * @return array
     */
    private static function createPhotosModel(int $productId, array $files) : array
    {
        $photos = [];
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
            return $photos;
        }
    }

    /**
     * @param $productId
     * @param array $files
     */
    private static function deleteFiles($productId, array $files)
    {
        foreach ($files as $file) {
            $path = self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                \File::delete($photoPath);
            }
        }
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute() {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    /**
     * @return BelongsTo
     */
    public function product() {
        return $this->belongsTo(Product::class);
    }

    /**
     * @param UploadedFile $file
     * @return $this
     * @throws \Exception
     */
    public function updateWithPhoto(UploadedFile $file) : ProductPhoto
    {
        try {
            self::uploadFiles($this->product_id, [$file]);
            DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            DB::commit();
            return $this;
        } catch (\Exception $e) {
            self::deleteFiles($this->product_id, [$file]);
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param $fileName
     */
    private function deletePhoto($fileName)
    {
        $dir = self::photosDir($this->product_id);
        Storage::disk('public')->delete("{$dir}/{$fileName}");
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function deleteWithPhoto() : bool
    {
        try {
            Db::beginTransaction();
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            DB::commit();
            return $result;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
